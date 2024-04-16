import psycopg2
from psycopg2.extras import Json
from datetime import date, datetime
import config
import jwt
from enum import Enum
from itertools import chain
import json
import pandas as pd


class UserType(Enum):
    administrator = "administrator"
    user = "user"


class ArhiveType(Enum):
    user = "user"
    trainer = "trainer"


key = config.jwt_key


class User:
    def __init__(
        self,
        id: int,
        name: str,
        login: str,
        password: str,
        type: UserType,
        createdDate: str,
    ) -> None:
        self.name = name
        self.id = id
        self.login = login
        self.password = password
        self.type = type
        self.createdDate = createdDate


connection = psycopg2.connect(
    host=config.host,
    user=config.user,
    password=config.password,
    database=config.db_name,
)
cursor = connection.cursor()


def get_user_from_token(token: str):
    try:
        id = jwt.decode(token, key, algorithms=["HS256"])["id"]
        data = get_user_from_id(id)
        return data
    except Exception as e:
        print(e)
        return None


def get_user_from_id(id: int):
    cursor.execute(
        f"""
        SELECT jsonb_build_object(
	        'id',users.id,
	        'password',users.password, 
	        'login',users.login,
	        'name',users.name,
	        'type',users.type, 
	        'createdDate', users."createdDate")
        FROM users
        WHERE id = {id} AND archived = false;"""
    )
    data = cursor.fetchone()
    if data == None:
        return None
    else:
        data = data[0]
        return User(
            data["id"],
            data["name"],
            data["login"],
            data["password"],
            UserType(data["type"]),
            data["createdDate"],
        )


def get_user_from_login(login: str):
    cursor.execute(
        f"""SELECT jsonb_build_object(
	        'id',users.id,
	        'password',users.password, 
	        'login',users.login,
	        'name',users.name,
	        'type',users.type, 
	        'createdDate', users."createdDate")
        FROM users
        WHERE "login" = '{login}' AND archived = false;"""
    )
    data = cursor.fetchone()
    if data == None:
        return None
    else:
        data = data[0]
        return User(
            data["id"],
            data["name"],
            data["login"],
            data["password"],
            UserType(data["type"]),
            data["createdDate"],
        )


def get_trainers_data_base():
    cursor.execute(
        """SELECT trainers.id,trainers.name,
                      CASE
                        WHEN COUNT(scenarios.id) > 0
                            THEN jsonb_agg(jsonb_build_object('id', scenarios.id, 'name', scenarios.name))
                            ELSE
                                '[]'::jsonb
                        END AS scenarios
                       FROM trainers 
                       LEFT JOIN scenarios ON trainers.id = scenarios.trainer_id
                       GROUP BY trainers.id	"""
    )
    data = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    # record_dict = dict(zip(columns, data))
    records_list = [dict(zip(columns, record)) for record in data]
    # print([arr[0] for arr in data])
    return records_list


def get_all_trainers():
    cursor.execute(
        """SELECT jsonb_build_object('id',id,'name',name,'date',date,'tags',tags) as result
	FROM public.trainers
    WHERE trainers.archived = false;"""
    )
    data = cursor.fetchall()

    arr = [i[0] for i in data]

    return arr


def GetAllUsers():
    cursor.execute(
        """SELECT json_agg(
                   json_build_object(
                   'id', users.id, 
                   'name', users.name,
                   'login',users.login, 
                   'password', users.password, 
                   'type',users.type,
                   'createdDate', users."createdDate")
                    ORDER BY users.id
                   ) AS result
            FROM users
            WHERE users.archived = false;"""
    )
    data = cursor.fetchone()
    return data[0]


def AddUser(name: str, login: str, password: str, type: UserType, date: str):
    cursor.execute(
        f"""
                   INSERT INTO users(
	                name, login, password, type, "createdDate")
	                VALUES ('{name}', '{login}', '{password}', '{type.name}', '{date}')
                    RETURNING id, name, type
                    """
    )

    data = cursor.fetchone()

    connection.commit()


def UpdateUser(id: int, name: str, login: str, password: str, type: UserType):
    cursor.execute(
        f"""
        UPDATE users
	    SET name= '{name}', login='{login}', password='{password}', type='{type.name}'
	    WHERE id = {id};"""
    )
    connection.commit()


def AddTrainer(name: str, app_id: str, user_id: int, scenarios: list, tags: list):
    date = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    json_scenarios = json.dumps(scenarios)
    cursor.execute(
        """INSERT INTO public.trainers(
	name, app_id, date, author, scenarios, tags)
	VALUES (%s, %s, %s, %s, %s, %s)
    RETURNING jsonb_build_object('id',id,'name',name,'scenarios',scenarios, 'tags', tags)""",
        (name, app_id, date, user_id, json_scenarios, tags),
    )

    connection.commit()

    data = cursor.fetchone()

    return data[0]


def GetTrainer(id: int):
    cursor.execute(
        f""" 
        SELECT jsonb_build_object(
	        'id',trainers.id, 
	        'name', trainers.name,
	        'app_id',trainers.app_id,
	        'date',trainers.date,
	        'scenarios',trainers.scenarios,
	        'tags',trainers.tags,
	        'author',jsonb_build_object('id',users.id, 'name', users.name, 'type', users.type)
        )
	    FROM trainers
	    JOIN users ON users.id = trainers.author
	    WHERE trainers.id = {id} AND trainers.archived = false
    """
    )

    data = cursor.fetchone()

    if data == None:
        return None
    else:
        return data[0]


def UpdateTrainer(id: int, name: str, app_id: str, scenarios: list, tags: list):
    json_scenarios = json.dumps(scenarios)
    cursor.execute(
        """UPDATE trainers
	SET name=%s, tags=%s, scenarios=%s, app_id=%s
	WHERE id = %s;""",
        (name, tags, json_scenarios, app_id, id),
    )
    connection.commit()


def AddKey(
    app_id: str, activation_day_count: int, creater_user_id: int, scenarios: list
):
    date = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    json_scenarios = Json(scenarios)
    cursor.execute(
        """INSERT INTO keys(
	app_id, activation_day_count, creater_user_id, scenarios, date)
	VALUES (%s, %s, %s, %s, %s);""",
        (app_id, activation_day_count, creater_user_id, json_scenarios, date),
    )

    connection.commit()


def GetAllArhive():
    cursor.execute(
        """
        SELECT COALESCE(json_agg(data.obj), '[]'::json)
        FROM (
            SELECT json_build_object('id', users.id, 'name', users.name, 'type', 'user', 'date', users."createdDate") AS obj 
        	FROM users
        	WHERE users.archived = true
            UNION ALL
            SELECT json_build_object('id', trainers.id, 'name', trainers.name, 'type','trainer','date', trainers.date) AS obj 
        	FROM trainers
        	WHERE trainers.archived = true
        ) AS data;
    """
    )

    data = cursor.fetchone()[0]
    return data


def AddArhive(id: int, typeArhive: ArhiveType):
    if typeArhive == ArhiveType.trainer:
        cursor.execute(
            """UPDATE trainers
                          SET archived= %s
                          WHERE id = %s;
            """,
            (True, id),
        )
    elif typeArhive == ArhiveType.user:
        cursor.execute(
            """UPDATE users
                          SET archived= %s
                          WHERE id = %s;
            """,
            (True, id),
        )
    connection.commit()


def RemoveArhive(users: list, trainers: list):
    # users = [el["id"] for el in elements if el["type"] == ArhiveType.user.value]
    # trainers = [el["id"] for el in elements if el["type"] == ArhiveType.trainer.value]

    cursor.execute(
        """
                UPDATE users
	                SET archived = false
	                WHERE id = ANY(%s);

                UPDATE trainers
	                SET archived = false
	                WHERE id = ANY(%s);""",
        (users, trainers),
    )
    connection.commit()
    print(users, trainers)

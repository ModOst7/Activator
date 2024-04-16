from flask import Flask
from flask import request
import security
import json
import scripts.searchs as searchs
import random
from flask_cors import CORS
import database
import jwt
import config
import flask
from datetime import date, datetime
from database import ArhiveType
import logger
from logger import ActionType
from types import SimpleNamespace


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


app = Flask(__name__)
CORS(app)

key = config.jwt_key


@app.route("/api/getIndex")
def index():
    return "index"


@app.route("/api/getData/<user_id>", methods=["GET", "POST"])
def getData(user_id):
    # data = User("t", "12")
    # print(user_id)
    # print(request.data)
    # jsonLoad = json.loads(request.data)
    # print(jsonLoad)
    # data.__dict__ = jsonLoad
    return "12"


@app.route("/api/auth/<token>", methods=["GET"])
def auth(token):
    user = database.get_user_from_token(token)
    action = "Вход в учетную запись"
    if user != None:
        logger.AddLog(True, user, action, "", "", "")
        return {
            "isAuth": True,
            "user": {"name": user.name, "id": user.id, "type": user.type.name},
        }
    logger.AddLog(False, user, action, "", "", "")
    return {
        "isAuth": False,
    }


@app.route("/api/key/generate", methods=["POST"])
def GetKey():
    # добавить имя
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        action = "Генерация ключа"

        data = request.get_json()
        print(data, "data")
        client_key: str = data["client_key"]
        app_id: str = data["app_id"]
        activation_day_count = data["activation_day_count"]
        scenarios = data["scenarios"]
        trainer_name = data["trainer_name"]
        if user == None:
            logger.AddLog(
                False, user, action, trainer_name, activation_day_count, scenarios
            )
            return {
                "isComplate": False,
                "key": "",
                "message": "Неавторизованный пользователь",
            }
        if client_key.split("-")[2] != app_id[0:4]:
            logger.AddLog(
                False, user, action, trainer_name, activation_day_count, scenarios
            )
            return {
                "isComplate": False,
                "key": "",
                "message": "Неверный id тренажера",
            }
        key = security.Key(
            client_key,
            scenarios,
            activation_day_count,
        ).activation_key
        print(key)
        if key == "":
            # logger.AddLog(True, user.name, "", "", "", "")
            logger.AddLog(
                False, user, action, trainer_name, activation_day_count, scenarios
            )
            return {
                "isComplate": False,
                "key": key,
                "message": "Неверный ключ поьзователя",
            }

        database.AddKey(app_id, activation_day_count, user.id, scenarios)
        logger.AddLog(True, user, action, trainer_name, activation_day_count, scenarios)
        return {
            "isComplate": True,
            "key": key,
            "message": "Ключ сгенерирован",
        }
    except Exception as e:
        print(e)
        logger.AddLog(
            False, user, action, trainer_name, activation_day_count, scenarios
        )
        return {"isComplate": False, "key": "", "message": "Вызвано исключение"}


@app.route("/api/login", methods=["POST"])
def Login():
    try:
        data = request.get_json()
        action = "Вход в учетную запись"
        if data["login"] != "" and data["password"] != "":
            user_data = database.get_user_from_login(data["login"])

            # return {"test": f"{data["login"]}, {user_data.login}"}

            if user_data == None:

                raise Exception("User not found")
                # return {"token": "", "isAuth": False}
            elif (
                user_data.login == data["login"]
                and user_data.password == data["password"]
            ):
                logger.AddLog(True, user_data, action, "", "", [])
                return {
                    "token": jwt.encode({"id": user_data.id}, key, algorithm="HS256"),
                    "isAuth": True,
                    "user": {
                        "name": user_data.name,
                        "id": user_data.id,
                        "type": user_data.type.name,
                    },
                }
            else:
                logger.AddLog(False, user_data, action, "", "", [])
                raise Exception("User not found")

        else:
            logger.AddLog(False, user_data, action, "", "", [])
            raise Exception("User not found")
    except Exception as e:
        print(e, "Exception")
        logger.AddLog(False, user_data, action, "", "", [])
        return {"token": "", "isAuth": False}


@app.route("/api/trainers", methods=["POST"])
def GetTrainers():
    token = request.authorization.token

    user = database.get_user_from_token(token)
    if user != None:
        return database.get_all_trainers()
    else:
        return json.dumps(404)


@app.route("/api/users", methods=["get"])
def GetUsers():
    token = request.authorization.token
    user = database.get_user_from_token(token)
    if user == None:
        return {"isError": True, "eror": "User not found"}
    if user.type == database.UserType.administrator:
        return {"isError": False, "data": database.GetAllUsers()}
    else:
        return {"isError": True, "eror": "User not administrator"}


@app.route("/api/user/add", methods=["post"])
def AddUser():
    try:
        todayDate = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        data = request.get_json()

        token = request.authorization.token
        user = database.get_user_from_token(token)
        name = data["name"]
        login = data["login"]
        password = data["password"]
        type = database.UserType(data["type"])
        action = "Добавление учетной записи"
        if user == None:
            logger.AddLog(False, user, action, "", "", "")
            return {
                "isError": True,
                "isCreated": False,
                "errorMessage": "Пользователь не найден",
            }
        elif user.type == database.UserType.user:
            logger.AddLog(False, user, action, "", "", "")
            return {
                "isError": True,
                "isCreated": False,
                "errorMessage": "Недостаточно прав",
            }
        elif (
            user.type == database.UserType.administrator
            and name != ""
            and login != ""
            and password != ""
            and type != None
        ):
            loginUser = database.get_user_from_login(login)
            if loginUser != None:
                logger.AddLog(False, user, action, "", "", "")
                return {
                    "isError": True,
                    "isCreated": False,
                    "errorMessage": "Пользователь с таким логином уже существует",
                }
            else:
                logger.AddLog(True, user.name, action, "", "", "")
                database.AddUser(name, login, password, type, todayDate)
                return {"isError": False, "isCreated": True}
        else:
            logger.AddLog(False, user, action, "", "", "")
            return {
                "isError": True,
                "isCreated": False,
                "errorMessage": "Неизвестная ошибка",
            }

    except Exception as e:
        print(e, "Exception")
        logger.AddLog(False, user, action, "", "", "")
        return {
            "isError": True,
            "isCreated": False,
            "errorMessage": "Вызвано исключение",
        }


@app.route("/api/user/edit", methods=["post"])
def EditUser():
    # todayDate = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    # print(todayDate)
    try:
        data = request.get_json()
        id = int(data["id"])
        login = data["login"]
        name = data["name"]
        password = data["password"]
        type = database.UserType(data["type"])
        token = request.authorization.token
        user = database.get_user_from_token(token)
        action = "Редактирование учетной записи"
        if user.type != database.UserType.administrator:
            logger.AddLog(False, user, action, "", "", "")
            return {
                "isEdit": False,
                "isError": True,
                "ErrorMessage": "Недостаточно прав",
            }

        userLogin = database.get_user_from_login(data["login"])

        if userLogin == None:
            logger.AddLog(True, user, action, "", "", "")
            database.UpdateUser(id, name, login, password, type)
            return {"isEdit": True, "isError": False}
        if userLogin.id == id:
            logger.AddLog(True, user, action, "", "", "")
            database.UpdateUser(id, name, login, password, type)
            return {"isEdit": True, "isError": False}
        else:
            logger.AddLog(False, user, action, "", "", "")
            return {
                "isEdit": False,
                "isError": True,
                "ErrorMessage": "Пользователь с таким логином уже существует",
            }
    except Exception as e:
        logger.AddLog(False, user, action, "", "", "")
        return {
            "isEdit": False,
            "isError": True,
            "ErrorMessage": "Вызвано исключение",
        }


@app.route("/api/trainer/add", methods=["post"])
def AddTrainer():
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        data = request.get_json()
        print(data)
        action = ActionType.AddTrainer.value
        scenarios = data["scenarios"]
        name = data["name"]
        user_id = data["user_id"]
        tags = data["tags"]
        app_id = data["app_id"]
        print(scenarios)
        if user == None:
            logger.AddLog(False, user, action, name, "", scenarios)
            return {"isComplate": False, "message": "Пользователь не найден"}

        if user.type != database.UserType.administrator:
            logger.AddLog(False, user, action, name, "", scenarios)
            return {"isComplate": False, "message": "Недостаточно прав"}

        database.AddTrainer(name, app_id, user_id, scenarios, tags)
        logger.AddLog(True, user, action, name, "", scenarios)
        return {"isComplate": True, "message": "Тренажер добавлен"}
    except Exception as e:
        print(e, "Exception")
        logger.AddLog(False, user, action, name, "", scenarios)
        return {"isComplate": False, "message": "Вызвано исключение"}


@app.route("/api/trainer/<id>", methods=["get"])
def GetTrainer(id: int):
    data = database.GetTrainer(id)
    if data == None:
        return {"message": "Тренажер не найден", "trainer": [], "isFind": False}
    return {"message": "", "trainer": data, "isFind": True}


@app.route("/api/trainer/edit", methods=["post"])
def TrainerEdit():
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        action = ActionType.EditTrainer.value
        data = request.get_json()
        id = data["id"]
        name = data["name"]
        app_id = data["app_id"]
        scenarios = data["scenarios"]
        tags = data["tags"]

        if user == None:
            logger.AddLog(False, user, action, name, "", scenarios)
            return {"isComplate": False, "message": "Пользователь не найден"}

        if user.type != database.UserType.administrator:
            logger.AddLog(False, user, action, name, "", scenarios)
            return {"isComplate": False, "message": "Недостаточно прав"}

        database.UpdateTrainer(id, name, app_id, scenarios, tags)
        logger.AddLog(True, user, action, name, "", scenarios)
        return {"isComplate": True, "message": "Тренажер изменен"}
    except Exception as e:
        print(e, "Exception")
        logger.AddLog(False, user, action, name, "", scenarios)
        return {"isComplate": False, "message": "Вызвано исключение"}


@app.route("/api/arhive", methods=["GET"])
def GetAllArhive():
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)

        if user == None:
            return []
        if user.type == database.UserType.administrator:
            return database.GetAllArhive()
        return []
    except Exception as e:
        print(e, "Exception")
        return []


class T:
    def __init__(self) -> None:
        self.id = -1


@app.route("/api/arhive/add", methods=["POST"])
def AddArhive():
    # Добавить имена тренажеров и пользователей
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        data = request.get_json()
        type = ArhiveType(data["type"])
        id = data["id"]
        name = data["name"] if type == ArhiveType.trainer else ""
        action = (
            ActionType.AddUserArchive.value
            if type == ArhiveType.user
            else ActionType.AddTrainerArchive.value
        )
        if user == None:
            logger.AddLog(False, user, action, name, "", "")
            return {"isComplate": False}

        if user.type == database.UserType.administrator:

            if user.id == id:
                logger.AddLog(False, user, action, name, "", "")
                return {"isComplate": False}

            database.AddArhive(id, type)
            logger.AddLog(True, user, action, name, "", "")
            return {"isComplate": True}
        return {"isComplate": False}
    except Exception as e:
        print(e, "Exception")
        print(action)
        logger.AddLog(False, user, action, name, "", "")
        return {"isComplate": False}


@app.route("/api/arhive/remove", methods=["POST"])
def RemoveArhive():
    # Добавить имена пользователей и тренажеров
    def AddLogs(
        isComplate: bool,
        user: database.User,
        action_user: str,
        action_trainer: str,
        data: list,
    ):
        for el in data:
            dataType = ArhiveType(el["type"])
            logger.AddLog(
                isComplate,
                user,
                action_user if dataType == ArhiveType.user else action_trainer,
                (
                    ""
                    if ArhiveType(el["type"]) == database.ArhiveType.user
                    else el["name"]
                ),
                "",
                "",
            )

    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        data = request.get_json()
        print(data)
        users_id = [el["id"] for el in data if el["type"] == ArhiveType.user.value]
        trainers_id = [
            el["id"] for el in data if el["type"] == ArhiveType.trainer.value
        ]
        action_user = ActionType.RemoveArhiveUser.value
        action_trainer = ActionType.RemoveArhiveTrainer.value
        if user == None:
            AddLogs(False, user, action_user, action_trainer, data)
            return {"isComplate": False}
        if user.type == database.UserType.administrator:
            database.RemoveArhive(users_id, trainers_id)
            AddLogs(True, user, action_user, action_trainer, data)
            return {"isComplate": True}
        return {"isComplate": False}
    except Exception as e:
        print(e, "Exception")
        AddLogs(False, user, action_user, action_trainer, data)
        return {"isComplate": False}


@app.route("/api/logs/<time>", methods=["GET"])
def GetAllLogs(time: str):
    try:
        token = request.authorization.token
        user = database.get_user_from_token(token)
        if user == None:
            raise Exception("User not found")
        if user.type != database.UserType.administrator:
            raise Exception("Недостаточно прав")
        print(time)
        times = time.split("&")
        time_start = datetime.strptime(times[0], logger.date_format)
        time_end = datetime.strptime(times[1], logger.date_format)
        return logger.GetAllLogs(time_start, time_end)
    except Exception as e:
        print(e, "Exception")
        return []


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

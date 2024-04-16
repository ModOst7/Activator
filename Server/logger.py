from datetime import datetime
import os
import json
from database import User
from enum import Enum


class ActionType(Enum):
    AddUserArchive = "Добавление пользователя в архив"
    AddTrainerArchive = "Добавление тренажера в архив"
    AddTrainer = "Добавление генератора ключей"
    EditTrainer = "Редактирование генератора ключа"
    RemoveArhiveTrainer = "Возврат генератора ключей из архива"
    RemoveArhiveUser = "Возвращение учетной записи из архива"
    GenerateKey = "Генерация ключа"


folder_path = "reports"
date_format = "%Y-%m-%dT%H:%M:%S"


def AddLog(
    isComplate: bool,
    user: User,
    action: str,
    trainer_name: str,
    type_license: int,
    enable_scenarios: list,
):
    path = GetConfig()
    date = datetime.now().strftime(date_format)

    jsonObj = {
        "isComplte": isComplate,
        "user_name": user.name if user != None else "",
        "action": action,
        "trainer_name": trainer_name,
        "type_license": type_license,
        "enable_scenarios": enable_scenarios,
        "date": date,
    }

    try:
        with open(path, "a") as file:
            file.write(json.dumps(jsonObj) + "\n")
        print("Data appended to the file successfully.")
    except Exception as e:
        print(f"Failed to append data to the file: {e}")


def GetConfig():
    date = datetime.now().strftime("%d-%m-%Y")
    path = os.path.join(folder_path, date + ".log")
    create_directory_if_not_exists(folder_path)
    create_or_check_file(path)
    return path


def create_directory_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directory '{directory}' created successfully.")
    else:
        print(f"Directory '{directory}' already exists.")


def create_or_check_file(file_path):
    if os.path.exists(file_path):
        print(f"File '{file_path}' exists.")
    else:
        print(f"File '{file_path}' does not exist. Creating it now...")
        try:
            with open(file_path, "w") as file:
                file.write("")  # Write an empty string to create the file
            print(f"File '{file_path}' created successfully.")
        except Exception as e:
            print(f"Failed to create file '{file_path}': {e}")


def GetAllLogs(start_date: datetime, end_date: datetime):
    arr = []
    files: list[str] = get_files_in_directory(folder_path)
    files: list[datetime] = [
        datetime.strptime(file.replace(".log", ""), "%d-%m-%Y") for file in files
    ]
    files = [
        date
        for date in files
        if date >= datetime(start_date.year, start_date.month, start_date.day)
        and date <= datetime(end_date.year, end_date.month, end_date.day)
    ]
    files = [file.strftime("%d-%m-%Y") + ".log" for file in files]

    print(files)
    for file in files:
        data = read_file(os.path.join(folder_path, file)).split("\n")
        arr += data
    arr = [json.loads(el) for el in arr if el != ""]
    arr = [
        el
        for el in arr
        if datetime.strptime(el["date"], date_format) >= start_date
        and datetime.strptime(el["date"], date_format) <= end_date
    ]
    print(arr)
    # arr = [el for el in arr if el["date"] >= start_date and el["date"] <= end_date]
    return arr  # [json.loads(el) for el in arr if el != ""]


def get_files_in_directory(directory):
    try:
        if not os.path.exists(directory):
            return []
        files = os.listdir(directory)
        print(f"Files in directory '{directory}':")
        return files
    except Exception as e:
        print(f"Failed to get files in directory: {e}")


def read_file(file_path):
    try:
        with open(file_path, "r") as file:
            contents = file.read()
        # print(f"Contents of the file '{file_path}':\n{contents}")
        return contents
    except Exception as e:
        print(f"Failed to read the file: {e}")
        return None

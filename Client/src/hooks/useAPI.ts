import { ISearchElement } from "@/components/search/SearchModel";
import { ISearchUserElement } from "@/components/users/SearchUsersModel";
import { IJournalRecord } from "@/components/journal/JournalModel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useCallback } from "react";
import { CustomDate } from "../utilities/utilities";
import axios_api from "axios";
import config from "@/utilities/config";
import { TypeRights } from "@/components/users/SearchUsersModel";
import { IUser } from "@/redux/features/rootSlice";
import { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import { ITag } from "@/components/tagEditor/tag/Tag";
import { ISearchArchiveElement } from "@/components/archive/SearchArchiveModel";

function getRandomInt(min: number, max: number) {
  // Используем Math.floor для округления вниз
  // и Math.random() для получения случайного числа в диапазоне [0, 1)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Scenario {
  id: number,
  name: string,
  visible: boolean,
}

interface IPromiseResult {
  isCreated: boolean;
  isError: boolean; // promise rejected value
}

interface IPromiseEditResult {
  isEdit: boolean;
  isError: boolean; // promise rejected value
  ErrorMessage?: string;
}

const simulators = [
  "Правила безопасности в офисе",
  "Токарь на стонках с ЧПУ",
  "Название нового тренажера",
  "КИТ 8D. Без правил безопасности в офисе",
  "Название название нового тренажера",
];

const trainers = [
  {
    id: "Sd8xc32a5asa",
    name: "Тренажер №1",
    date: "20.12.2023",
    scenarios: [
      {
        id: "SKd8as",
        name: "asdasd",
        isVisible: true,
        isEnable: false,
      },
      {
        id: "a2s3d",
        name: "бульк",
        isVisible: true,
        isEnable: false,
      }
    ],
    tags: [
      {
        id: "1",
        name: "tag 1"
      },
      {
        id: "2",
        name: "tag 2"
      },
      {
        id: "3",
        name: "tag 3"
      }
    ],
  },
  {
    id: "xc8sad5sa54s",
    name: "Тренажер №228",
    date: "20.02.2020",
    scenarios: [
      {
        id: "52fd6",
        name: "Сценарий 1",
        isVisible: true,
        isEnable: false,
      },
      {
        id: "ghu5sb2",
        name: "Сценарий 2",
        isVisible: true,
        isEnable: false,
      }
    ],
    tags: [
      {
        id: "1",
        name: "tag 1"
      },
      {
        id: "2",
        name: "tag 2"
      },
      {
        id: "3",
        name: "tag 3"
      }
    ],
  },
  {
    id: "ojSwpm32a85a71a",
    name: "Тренажер №1488",
    date: "1.09.1941",
    scenarios: [
      {
        id: "c2xoe4",
        name: "сценарий 1",
        isVisible: true,
        isEnable: false,
      },
      {
        id: "sa8x5e",
        name: "сценарий 2",
        isVisible: true,
        isEnable: false,
      }
    ],
    tags: [
      {
        id: "1",
        name: "tag 1"
      },
      {
        id: "2",
        name: "tag 2"
      },
      {
        id: "3",
        name: "tag 3"
      }
    ],
  },
]

function useAPI() {
  const axios = useAppSelector((state) => state.rootReducer.axios);

  async function GetListSimulators(): Promise<ISearchElement[]> {
    try {
      const fetchData: ISearchElement[] = await (await axios.post("/trainers")).data
      return fetchData;
    }
    catch {
      return []
    }

  }

  async function GetUsers(): Promise<IUser[]> {
    try {
      const fetchData = await (await axios.get("/users")).data
      if (fetchData.isError) {
        return fetchData.isError
      }

      return fetchData.data.map((item: IUser) => {
        item.createdDate = new Date(item.createdDate);
        return item;
      });
    }
    catch {
      return []
    }
  }

  async function GetListRecords(): Promise<IJournalRecord[]> {
    return [
      {
        id: 65,
        isSuccess: true,
        date: new Date(),
        description: undefined,
        username: "Богословский Александр Александрович",
        productname: undefined,
        action: "Добавление генератора ключа",
        licenseType: undefined,
        licenseDays: undefined,
        scenarios: undefined,
      },
      {
        id: 11,
        isSuccess: true,
        date: new Date("December 17, 1995 03:24:00"),
        description: "",
        username: "Мельникова Ксения Витальевна",
        productname: "Правила безопасности в офисе",
        action: "Генерация ключа",
        licenseType: "Срочная",
        licenseDays: 30,
        scenarios: [
          {
            id: 1,
            name: "сценарий 1",
            isVisible: true,
            isEnable: false,
          },
          {
            id: 2,
            name: "сценарий 2",
            isVisible: true,
            isEnable: false,
          }
        ],
      },
      {
        id: 71,
        isSuccess: false,
        date: new Date("November 11, 2023 10:14:20"),
        description: undefined,
        username: "Прокопенко Алина Дмитриевна",
        productname: "Правила безопасности в офисе",
        action: "Редактирование ключа",
        licenseType: "Бессрочная",
        licenseDays: undefined,
        scenarios: [
          {
            id: 1,
            name: "сценарий один",
            isVisible: true,
            isEnable: false,
          },
          {
            id: 2,
            name: "сценарий два",
            isVisible: true,
            isEnable: false,
          },
          {
            id: 3,
            name: "сценарий три",
            isVisible: true,
            isEnable: false,
          }
        ],
      },
      {
        id: 38,
        isSuccess: true,
        date: new Date("November 11, 2023 09:14:20"),
        description: undefined,
        username: "Прокопенко Алина Дмитривена",
        productname: undefined,
        action: "Вход в учетную запись",
        licenseType: undefined,
        licenseDays: undefined,
        scenarios: undefined,
      },
    ]
  }
  /*
    async function GetUsers(): Promise<IUser[]> {
      return [
        {
          id: 10001,
          type: TypeRights.administrator,
          name: "Администратор",
          date: "11.01.2024",
          login: "admin",
          password: "jdisad28JD*@!9sads"
        },
        {
          id: 10002,
          type: TypeRights.user,
          name: "Богословский Александр Александрович",
          date: "20.12.2023",
          login: "alex",
          password: "asd321asd"
        },
        {
          id: 10006,
          type: TypeRights.user,
          name: "Мельникова Ксения Витальевна",
          date: "20.12.2023",
          login: "ksuha",
          password: "sdf987sdfs8"
        },
        {
          id: 10009,
          type: TypeRights.user,
          name: "Сергеева Мария Вячеславовна",
          date: "22.11.2023",
          login: "serg_mari",
          password: "654as6d4"
        },
      ];
    }
  */
  /*
   async function GetListArchive() {
     return [
       {
         id: "saodalsd",
         category: "Тренажер",
         name: "Правила безопасности",
         date: "21.02.2023 12:05:14",
         isChecked: false,
       },
       {
         id: "1005",
         category: "Пользователь",
         name: "Прокопенко Алина Дмитриевна",
         date: "11.02.2023 17:45:31",
         isChecked: false,
       },
       {
         id: "1007",
         category: "Пользователь",
         name: "Фурсова Елизавета Владимировна",
         date: "01.12.2023 14:44:56",
         isChecked: false,
       },
       {
         id: "1002",
         category: "Пользователь",
         name: "Скуфьин Алексей Иванович",
         date: "01.12.2023 02:25:18",
         isChecked: false,
       },
       {
         id: "vct45fga11",
         category: "Тренажер",
         name: "Токарь на станке",
         date: "25.05.2021 11:45:33",
         isChecked: false,
       },
       {
         id: "df534thfd4",
         category: "Тренажер",
         name: "Монтаж оборудования",
         date: "21.02.2023 12:05:14",
         isChecked: false,
       },
     ]
   }
   */

  async function GetListArchive() {
    try {
      const fetchData = await (await axios.get("/arhive")).data;

      return fetchData.map((item: any) => {
        console.log(item.date)
        return {
          date: new Date(item.date),
          id: item.id.toString(),
          name: item.name,
          category: item.type,
          isChecked: false
        }
      });
    }
    catch {
      return []
    }
  }

  async function AddToArchive(id: number, name: string, type: string) {
    return axios.post('/arhive/add', {
      id: id,
      name: name,
      type: type,
    });
  }

  async function RemoveFromArchive(records: ISearchArchiveElement[]) {
    console.log(records);
    const items = records.filter((item) => item.isChecked).map((item) => {
      return {
        id: Number(item.id),
        type: item.category,
      }
    })
    console.log(items);

    return axios.post('/arhive/remove',
      items
    )
  }

  async function GenerateKey(clientCode: string, appId: string, dayCount: number, trainerName: string, scenarios: IScenario[]) {
    const tempScenarios = scenarios.map((scenario) => {
      return {
        id: scenario.id,
        name: scenario.name,
      }
    })

    return axios.post('/key/generate', {
      client_key: clientCode,
      app_id: appId,
      activation_day_count: dayCount,
      trainer_name: trainerName,
      scenarios: tempScenarios,
    })
  }

  async function GetTrainer(id: string) {
    try {
      const fetchData = await (await axios.get("/trainer/" + id)).data
      if (!fetchData.isFind) {
        return fetchData.message;
      }
      fetchData.trainer.tags = fetchData.trainer.tags.map((tag: string) => {
        return {
          id: Math.random().toString(),
          name: tag,
        }
      });
      fetchData.trainer.scenarios = fetchData.trainer.scenarios.map((scenario: Scenario) => {
        return {
          id: scenario.id,
          name: scenario.name,
          isVisible: scenario.visible,
          isEnable: false,
        }
      })
      console.log(fetchData.trainer);
      return fetchData.trainer;

      /*return fetchData.data.map((item: IUser) => {
        item.createdDate = new Date(item.createdDate);
        return item;
      });*/
    }
    catch {
      return []
    }
    /*for (let index = 0; index < trainers.length; index++) {
      if (id == trainers[index].id) {
        return trainers[index];
      }
    }
    return null;*/
  }

  async function AddUser(name: string, type: TypeRights, login: string, password: string): Promise<IPromiseResult> {
    const promiseResult = {
      isCreated: true,
      isError: false
    }
    await axios.post('/user/add', {
      name: name,
      login: login,
      password: password,
      type: type,
    })
      .then(function (response) {
        console.log(response);
        promiseResult.isCreated = response.data.isCreated;
        promiseResult.isError = response.data.isError;
      })
      .catch(function (error) {
        console.log(error);
      });
    return promiseResult;
  }

  function AddTrainer(appId: string, vendorCode: string, userId: number, name: string, scenarios: IScenario[], tags: ITag[]) {
    const tempTags = tags.map((tag) => {
      return tag.name
    })

    return axios.post('/trainer/add', {
      app_id: appId,
      vendor_code: vendorCode,
      user_id: userId,
      name: name,
      scenarios: scenarios,
      tags: tempTags,
    })
  }

  function EditTrainer(id: number, vendorCode:string, appId: string, name: string, scenarios: IScenario[], tags: ITag[]) {
    const tempTags = tags.map((tag) => {
      return tag.name
    })
    const tempScenarios = scenarios.map((scenario) => {
      return {
        id: scenario.id,
        name: scenario.name,
        visible: scenario.isVisible
      }
    })
    console.log(tempScenarios)
    return axios.post('/trainer/edit', {
      id: id,
      vendor_code: vendorCode,
      name: name,
      app_id: appId,
      scenarios: tempScenarios,
      tags: tempTags,
    })
  }

  async function EditUser(id: number, name: string, type: TypeRights, login: string, password: string): Promise<IPromiseEditResult> {
    const promiseResult = {
      isEdit: true,
      isError: false
    }
    await axios.post('/user/edit', {
      id: id,
      name: name,
      login: login,
      password: password,
      type: type,
    })
      .then(function (response) {
        console.log(response);
        promiseResult.isEdit = response.data.isEdit;
        promiseResult.isError = response.data.isError;
      })
      .catch(function (error) {
        console.log(error);
      });
    return promiseResult;
  }

  async function GenerateAppId() {
    const fetchData = await (await axios.get("/trainer/generate/id"));
    return fetchData;
  }

  async function GetLogs(datetimeStart?: Date | null, datetimeEnd?: Date | null) {
    console.log(datetimeStart);
    console.log(datetimeEnd);
    let dateStart = datetimeStart; //new Date(2023, 1, 1); //datetimeStart;
    let dateEnd = datetimeEnd; //new Date(2024, 2, 30); //datetimeEnd;
    if (dateStart && dateEnd) {
      let hoursDiff = dateStart.getHours() - dateStart.getTimezoneOffset() / 60;
      dateStart.setHours(hoursDiff);
      console.log(dateStart.toJSON());

      hoursDiff = dateEnd.getHours() - dateEnd.getTimezoneOffset() / 60;
      dateEnd.setHours(hoursDiff);
      console.log(dateEnd.toJSON());

      let JSONedStart = dateStart.toJSON().slice(0, dateStart.toJSON().length - 5);
      let JSONedEnd = dateEnd.toJSON().slice(0, dateEnd.toJSON().length - 5);

      let years = JSONedStart.slice(0, 4);
      let months = JSONedStart.slice(8, 10);
      //JSONedStart.replace(years, months)

      //return axios.get('/logs/' + JSONedStart + '&' + JSONedEnd);
      const fetchData = await (await axios.get('/logs/' + JSONedStart + '&' + JSONedEnd)).data;
      console.log(fetchData)
      return fetchData.map((item:any) => {
        return {
          action: item.action,
          date: new Date(item.date),
          scenarios: item.enable_scenarios ? item.enable_scenarios : [],
          isSuccess: item.isComplte,
          productname: item.trainer_name,
          licenseType: item.type_license,
          username: item.user_name,
          vendorCode: item.vendor_code,

          id: item.id,
          description: "string",
          licenseDays: 0,

        }
      })
      //return fetchData;
      //return axios.get('/logs/' + "11-02-2024T10:00:00" + '&' + "15-02-2024T10:00:00");
    }


  }
/*
  const get = new Promise<ISearchElement[]>((reslove, reject) => {
    //const  resposre = await axios.post("/allTrainers")

    //console.log(resposre.data)

    const data: ISearchElement[] = [];
    for (let i = 1; i <= 1000; i++) {
      data.push({
        id: i,
        date: `${new CustomDate().format()}`,
        name: `${simulators[getRandomInt(0, simulators.length - 1)]} - ${i}`,
      });
    }
    return data;


  })
*/
  return {
    GetListSimulators,
    GetUsers,
    GetTrainer,
    GetListArchive,
    GetListRecords,
    GetLogs,
    AddUser,
    EditUser,
    AddTrainer,
    EditTrainer,
    GenerateKey,
    AddToArchive,
    RemoveFromArchive,
    GenerateAppId,
  };
}

export default useAPI;

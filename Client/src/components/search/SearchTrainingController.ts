"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ISearchElement,
  setAllTrainersData,
  setFilter,
  setHistory,
  setTrainerData,
  setVisibleHistory,
  setDatetimeStart,
  setDatetimeEnd,
} from "./SearchModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { findTag } from "@/utilities/utilities";

import useAPI from "@/hooks/useAPI";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const api = useAPI();
  const filter = useAppSelector((state) => state.searchModel.filter);
  const history = useAppSelector((state) => state.searchModel.history);
  const datetimeStart = useAppSelector((state) => state.searchModel.datetimeStart);
  const datetimeEnd = useAppSelector((state) => state.searchModel.datetimeEnd);
  const allTrainersData = useAppSelector(
    (state) => state.searchModel.allTrainersData
  );

  const memoized = useMemo(() => {
    return filter;
  }, [filter]);

  const GetVisibleHistory = () => {
    return useAppSelector((state) => state.searchModel.isVisibleHistory);
  };

  const SetVisibleHistory = (value: boolean) => {
    dispatch(setVisibleHistory(value));
  };

  const ShowHistory = () => {
    SetVisibleHistory(true);
  };

  const HideHistory = () => {
    SetVisibleHistory(false);
  };

  const CheckVisibleHistory = () => {
    console.log("check");
    SetVisibleHistory(true);
  };

  const GetTrainersData = () => {
    return useAppSelector((state) => state.searchModel.trainersData);
  };

  const SetTrainingsData = (data: ISearchElement[]) => {
    dispatch(setTrainerData(data));
  };

  const SetAllTrainersData = (data: ISearchElement[]) => {
    dispatch(setAllTrainersData(data));
  };

  const GetData = () => {
    return useAppSelector((state) => state.searchModel.trainersData);
  };

  const SetDatetimeStart = (request: Date | undefined) => {
    dispatch(setDatetimeStart(request));
  }

  const GetDatetimeStart = () => {
    return useAppSelector((state) => state.searchModel.datetimeStart);
  };

  const GetDatetimeEnd = () => {
    return useAppSelector((state) => state.searchModel.datetimeEnd);
  };

  const SetDatetimeEnd = (request: Date | undefined) => {
    dispatch(setDatetimeEnd(request));
  }

  const ChangeDatetimeFilter = (datetimeStart?: Date, datetimeEnd?: Date) => {
    if (datetimeStart && datetimeEnd) {
      let start = new Date(datetimeStart?.setHours(0));
      let end = new Date(datetimeEnd?.setHours(23));
      SetDatetimeStart(start);
      SetDatetimeEnd(end);
  } else {
      SetDatetimeStart(datetimeStart);
      SetDatetimeEnd(datetimeEnd);
  }
  }

  const SetFilter = (request: string) => {
    dispatch(setFilter(request));
    request = request.trim();
    if (request !== "") {
      const data = allTrainersData.filter((item) => {
        if (item.name.toLowerCase().includes(request.toLowerCase()) || findTag(item.tags, request) || item.vendor_code?.toLowerCase().includes(request.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }
        
      );
      SetTrainingsData(data);
    } else {
      SetTrainingsData(allTrainersData);
    }
  };

  const SetHistory = (data: string[]) => {
    dispatch(setHistory(data));
  };

  const AddHistory = (data: string) => {
    if (data.trim() == "" || history.includes(data)) return;
    const localhistory = [
      data.trim().replaceAll("  ", " "),
      ...history.slice(0, 2),
    ];
    SetHistory(localhistory);
    localStorage.setItem("history", localhistory.toString());
  };

  useEffect(() => {
    console.log("CONTROLLER START");
    const fetchData = async () => {

      const data = await api.GetListSimulators();
      console.log(data, 'data')
      if (data == undefined) return;
      SetTrainingsData(data);
      SetAllTrainersData(data);
      try {
        const localhistory = localStorage.getItem("history");
        console.log(localhistory);
        if (localhistory == null) {
          throw new Error("Не найден ключ в локальной памяти");
        } else {
          SetHistory(localhistory.split(",").slice(0, 3));
        }
      } catch {
        SetHistory([]);
      }
    }
    fetchData();

  }, []);

  useEffect(() => {
    if (datetimeStart && datetimeEnd) {
      const data = allTrainersData.filter((item) => {
        let date = new Date(item.date);

        if (date < datetimeEnd && date > datetimeStart)
          return true
        else return false
      });
      SetTrainingsData(data);
    } else {
      SetTrainingsData(allTrainersData);
    }
  }, [datetimeStart])

  useEffect(() => {
    console.log(filter, " filter");
    clearTimeout(timer);

    const timeout = setTimeout(() => {
      console.log(history);
      AddHistory(filter);
    }, 1000);
    setTimer(timeout);
  }, [filter]);

  return {
    GetDatetimeStart,
    GetDatetimeEnd,
    ChangeDatetimeFilter,
    GetVisibleHistory,
    SetVisibleHistory,
    CheckVisibleHistory,
    ShowHistory,
    HideHistory,
    GetData,
    GetTrainersData,
    SetFilter,
    filter,
    history,
  };
};

export default useSearch;

"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    IJournalRecord,
    setRecordsData,
    setAllRecordsData,
    setFilterByUser,
    setFilterByProduct,
    setFilterByAction,
    setDatetimeStart,
    setDatetimeEnd,
} from "./JournalModel";
import { useCallback, useEffect, useMemo, useState } from "react";

import useAPI from "@/hooks/useAPI";

const useJournal = () => {
    const dispatch = useAppDispatch();
    const api = useAPI();
    const datetimeStart = useAppSelector((state) => state.journalModel.datetimeStart);
    const datetimeEnd = useAppSelector((state) => state.journalModel.datetimeEnd);
    const filterByUser = useAppSelector((state) => state.journalModel.filterByUser);
    const filterByProduct = useAppSelector((state) => state.journalModel.filterByProduct);
    const filterByAction = useAppSelector((state) => state.journalModel.filterByAction);
    const allRecordsData = useAppSelector(
        (state) => state.journalModel.allRecordsData
    );
    const usersData = useAppSelector((state) => state.searchUsersModel.usersData);


    /*const memoized = useMemo(() => {
        return filter;
    }, [filter]);*/

    const GetRecordsData = () => {
        return useAppSelector((state) => state.journalModel.recordsData);
    };

    const GetFilterByAction = () => {
        return useAppSelector((state) => state.journalModel.filterByAction);
    };

    const GetFilterByUser = () => {
        return useAppSelector((state) => state.journalModel.filterByUser);
    }

    const SetRecordsData = (data: IJournalRecord[]) => {
        dispatch(setRecordsData(data));
    };

    const SetAllRecordsData = (data: IJournalRecord[]) => {
        dispatch(setAllRecordsData(data));
    };

    const SetFilterByUser = (request: string) => {
        dispatch(setFilterByUser(request));

        request = request.trim();
        if (request !== "") {
            const data = allRecordsData.filter((item) =>
                item.username.toLowerCase().includes(request.toLowerCase())
            );
            SetRecordsData(data);
        } else {
            SetRecordsData(allRecordsData);
        }
    }

    const SetFilterByProduct = (request: string) => {
        dispatch(setFilterByProduct(request));

        request = request.trim();
        if (request !== "") {
            const data = allRecordsData.filter((item) => {
                if (item.productname) {
                    return item.productname.toLowerCase().includes(request.toLowerCase())
                } else return false;

            });
            SetRecordsData(data);
        } else {
            SetRecordsData(allRecordsData);
        }
    }

    const SetFilterByAction = (request: string) => {
        dispatch(setFilterByAction(request));

        request = request.trim();
        if (request !== "") {
            const data = allRecordsData.filter((item) =>
                item.action.toLowerCase().includes(request.toLowerCase())
            );
            SetRecordsData(data);
        } else {
            SetRecordsData(allRecordsData);
        }
    }

    const SetDatetimeStart = (request: Date | null) => {
        dispatch(setDatetimeStart(request));
    }

    const SetDatetimeEnd = (request: Date | null) => {
        dispatch(setDatetimeEnd(request));
    }

    const ChangeDatetimeFilter = (datetimeStart?: Date, datetimeEnd?: Date) => {
        if (datetimeStart && datetimeEnd) {
            SetDatetimeStart(datetimeStart);
            SetDatetimeEnd(datetimeEnd);
        }
    }

    const ResetFilters = () => {
        SetFilterByAction("");
        SetFilterByProduct("");
        SetFilterByUser("");
        SetDatetimeStart(new Date((new Date()).setDate((new Date()).getDate() - 1)));
        SetDatetimeEnd(new Date());
    }


    const GetSortingByName = () => {
        return useAppSelector((state) => state.searchUsersModel.sortingByName);
    }

    const GetSortingByDate = () => {
        return useAppSelector((state) => state.searchUsersModel.sortingByDate);
    }

/*
    useEffect(() => {
        console.log("RECORDS CONTROLLER START");
        const fetchData = async () => {

            //const data = await api.GetListRecords();
            console.log(datetimeStart);
            console.log(datetimeEnd);
            const data = await api.GetLogs(datetimeStart, datetimeEnd);
            console.log(data, 'data');
            if (data == undefined) return;
            SetRecordsData(data);
            SetAllRecordsData(data);
        }
        fetchData();

    }, []);*/

    useEffect(() => {
        console.log(console.log("Changed"));
        const fetchData = async () => {

            //const data = await api.GetListRecords();

            const data = await api.GetLogs(datetimeStart, datetimeEnd);
            console.log(data, 'data');
            if (data == undefined) return;
            SetRecordsData(data);
            SetAllRecordsData(data);
        }
        fetchData();

    }, [datetimeEnd,])

    return {
        GetFilterByAction,
        GetFilterByUser,
        GetRecordsData,
        SetRecordsData,
        SetAllRecordsData,
        SetFilterByUser,
        SetFilterByProduct,
        SetFilterByAction,
        SetDatetimeStart,
        SetDatetimeEnd,
        ChangeDatetimeFilter,
        ResetFilters,

        datetimeEnd,
        datetimeStart,
        filterByUser,
        filterByProduct,
        filterByAction,
    };
};

export default useJournal;
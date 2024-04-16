"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    /*ISearchUserElement,*/
    setAllUsersData,
    setFilter,
    setUsersData,
    setSortingByName,
    setSortingByDate,
    setDatetimeStart,
    setDatetimeEnd,
} from "./SearchUsersModel";

import { IUser } from "@/redux/features/rootSlice";
import { useCallback, useEffect, useMemo, useState } from "react";

import useAPI from "@/hooks/useAPI";

const useSearchUsers = () => {
    const dispatch = useAppDispatch();
    const api = useAPI();
    const filter = useAppSelector((state) => state.searchUsersModel.filter);
    const datetimeStart = useAppSelector((state) => state.searchUsersModel.datetimeStart);
    const datetimeEnd = useAppSelector((state) => state.searchUsersModel.datetimeEnd);
    const allUsersData = useAppSelector(
        (state) => state.searchUsersModel.allUsersData
    );
    const usersData = useAppSelector((state) => state.searchUsersModel.usersData);


    const memoized = useMemo(() => {
        return filter;
    }, [filter]);

    const GetUsersData = () => {
        return useAppSelector((state) => state.searchUsersModel.usersData);
    };

    const SetUsersData = (data: IUser[]) => {
        dispatch(setUsersData(data));
    };

    const SetAllUsersData = (data: IUser[]) => {
        dispatch(setAllUsersData(data));
    };

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


    const SetDatetimeStart = (request: Date | undefined) => {
        dispatch(setDatetimeStart(request));
    }

    const GetDatetimeStart = () => {
        return useAppSelector((state) => state.searchUsersModel.datetimeStart);
    };

    const GetDatetimeEnd = () => {
        return useAppSelector((state) => state.searchUsersModel.datetimeEnd);
    };

    const SetDatetimeEnd = (request: Date | undefined) => {
        dispatch(setDatetimeEnd(request));
    }

    const SetFilter = (request: string) => {
        dispatch(setFilter(request));
        request = request.trim();
        if (request !== "") {
            const data = allUsersData.filter((item) =>
                item.name.toLowerCase().includes(request.toLowerCase())
            );
            SetUsersData(data);
        } else {
            SetUsersData(allUsersData);
        }
    };

    const SetSortingByName = (isAscending: boolean | undefined) => {
        dispatch(setSortingByName(isAscending));
        let data = [...usersData];
        if (isAscending === true) {
            data.sort((a: IUser, b: IUser) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        } else if (isAscending === false) {
            data.sort((a: IUser, b: IUser) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        } else {
            data.sort((a: IUser, b: IUser) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
        }
        SetUsersData(data);
    };

    const SetSortingByDate = (isAscending: boolean | undefined) => {
        dispatch(setSortingByDate(isAscending));
        let data = [...usersData];
        if (isAscending === true) {
            data.sort((a: IUser, b: IUser) => {
                if (a.createdDate > b.createdDate) return -1;
                if (a.createdDate < b.createdDate) return 1;
                return 0;
            });
        } else if (isAscending === false) {
            data.sort((a: IUser, b: IUser) => {
                if (a.createdDate < b.createdDate) return -1;
                if (a.createdDate > b.createdDate) return 1;
                return 0;
            });
        } else {
            data.sort((a: IUser, b: IUser) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
        }
        SetUsersData(data);
    };

    const GetSortingByName = () => {
        return useAppSelector((state) => state.searchUsersModel.sortingByName);
    }

    const GetSortingByDate = () => {
        return useAppSelector((state) => state.searchUsersModel.sortingByDate);
    }

    const RefreshData = () => {
        const fetchData = async () => {

            const data = await api.GetUsers();
            console.log(data, 'data');
            if (data == undefined) return;
            SetUsersData(data);
            SetAllUsersData(data);
        }
        fetchData();
    }


    useEffect(() => {
        console.log("USERS CONTROLLER START");
        const fetchData = async () => {

            const data = await api.GetUsers();
            console.log(data, 'data');
            if (data == undefined) return;
            SetUsersData(data);
            SetAllUsersData(data);
        }
        fetchData();

    }, []);

    useEffect(() => {
        if (datetimeStart && datetimeEnd) {
            const data = allUsersData.filter((item) => {
                let date = new Date(item.createdDate);

                if (date < datetimeEnd && date > datetimeStart)
                    return true
                else return false
            });
            SetUsersData(data);
        } else {
            SetUsersData(allUsersData);
        }
    }, [datetimeStart])

    return {
        RefreshData,
        GetSortingByName,
        SetSortingByName,
        GetSortingByDate,
        SetSortingByDate,
        GetUsersData,
        SetFilter,
        ChangeDatetimeFilter,
        GetDatetimeStart,
        GetDatetimeEnd,
        filter,
    };
};

export default useSearchUsers;
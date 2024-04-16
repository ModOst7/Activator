"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    ISearchArchiveElement,
    setAllArchiveData,
    setFilter,
    setArchiveData,
    setSortingByCategory,
    setSortingByName,
    setSortingByDate,
    setDatetimeStart,
    setDatetimeEnd,
} from "./SearchArchiveModel";
import { useCallback, useEffect, useMemo, useState } from "react";

import useAPI from "@/hooks/useAPI";

const useSearchArchive = () => {
    const dispatch = useAppDispatch();
    const api = useAPI();
    const filter = useAppSelector((state) => state.searchArchiveModel.filter);
    const datetimeStart = useAppSelector((state) => state.searchArchiveModel.datetimeStart);
    const datetimeEnd = useAppSelector((state) => state.searchArchiveModel.datetimeEnd);
    const allArchiveData = useAppSelector(
        (state) => state.searchArchiveModel.allArchiveData
    );
    const archiveData = useAppSelector((state) => state.searchArchiveModel.archiveData);


    const memoized = useMemo(() => {
        return filter;
    }, [filter]);

    const GetArchiveData = () => {
        return useAppSelector((state) => state.searchArchiveModel.archiveData);
    };

    const SetArchiveData = (data: ISearchArchiveElement[]) => {
        dispatch(setArchiveData(data));
    };

    const SetAllArchiveData = (data: ISearchArchiveElement[]) => {
        dispatch(setAllArchiveData(data));
    };

    const SetFilter = (request: string) => {
        dispatch(setFilter(request));
        request = request.trim();
        if (request !== "") {
            const data = allArchiveData.filter((item) =>
                item.name.toLowerCase().includes(request.toLowerCase())
            );
            SetArchiveData(data);
        } else {
            SetArchiveData(allArchiveData);
        }
    };

    const SetSortingByName = (isAscending: boolean) => {
        dispatch(setSortingByName(isAscending));
        let data = [...archiveData];
        if (isAscending) {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        } else {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
        SetArchiveData(data);
        return;
    };

    const SetSortingByDate = (isAscending: boolean) => {
        dispatch(setSortingByDate(isAscending));
        let data = [...archiveData];
        if (isAscending) {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0;
            });
        } else {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return 0;
            });
        }
        SetArchiveData(data);
    };

    /*
    const SetSortingByCategory = (isAscending: boolean) => {
        dispatch(setSortingByCategory(isAscending));
        let data = [...archiveData];
        if (isAscending) {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.category > b.category) return -1;
                if (a.category < b.category) return 1;
                return 0;
            });
        } else {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                return 0;
            });
        }
        SetArchiveData(data);
    };
    */
    const SetSortingByCategory = (isAscending: boolean | undefined) => {
        dispatch(setSortingByCategory(isAscending));
        let data = [...archiveData];
        if (isAscending === true) {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.category > b.category) return -1;
                if (a.category < b.category) return 1;
                return 0;
            });
        } else if (isAscending === false) {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                return 0;
            });
        } else {
            data.sort((a: ISearchArchiveElement, b: ISearchArchiveElement) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
        }
        SetArchiveData(data);
    };

    const GetSortingByCategory = () => {
        return useAppSelector((state) => state.searchArchiveModel.sortingByCategory);
    }

    const GetSortingByName = () => {
        return useAppSelector((state) => state.searchArchiveModel.sortingByName);
    }

    const GetSortingByDate = () => {
        return useAppSelector((state) => state.searchArchiveModel.sortingByDate);
    }

    const CheckData = (id: string) => {
        const data = archiveData.map((item) => ({
            ...item,
            isChecked: item.id === id ? !item.isChecked : item.isChecked
        }))
        SetArchiveData(data);
    }

    const RemoveFromArchive = (records: ISearchArchiveElement[]) => {
        api.RemoveFromArchive(records).then(() => {
            RefreshData();
        });
    }


    const SetDatetimeStart = (request: Date | undefined) => {
        dispatch(setDatetimeStart(request));
    }

    const GetDatetimeStart = () => {
        return useAppSelector((state) => state.searchArchiveModel.datetimeStart);
    };

    const GetDatetimeEnd = () => {
        return useAppSelector((state) => state.searchArchiveModel.datetimeEnd);
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

    const RefreshData = () => {
        const fetchData = async () => {

            const data = await api.GetListArchive();
            console.log(data, 'data');
            if (data == undefined) return;
            SetArchiveData(data);
            SetAllArchiveData(data);
        }
        fetchData();
    }


    useEffect(() => {
        console.log("ARCHIVE CONTROLLER START");
        const fetchData = async () => {

            const data = await api.GetListArchive();
            console.log(data, 'data');
            if (data == undefined) return;
            SetArchiveData(data);
            SetAllArchiveData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (datetimeStart && datetimeEnd) {
            const data = allArchiveData.filter((item) => {
                let date = new Date(item.date);

                if (date < datetimeEnd && date > datetimeStart)
                    return true
                else return false
            });
            SetArchiveData(data);
        } else {
            SetArchiveData(allArchiveData);
        }
    }, [datetimeStart])

    return {
        GetDatetimeStart,
        GetDatetimeEnd,
        SetDatetimeStart,
        SetDatetimeEnd,
        ChangeDatetimeFilter,
        CheckData,
        GetSortingByCategory,
        SetSortingByCategory,
        GetSortingByName,
        SetSortingByName,
        GetSortingByDate,
        SetSortingByDate,
        GetArchiveData,
        SetFilter,
        RemoveFromArchive,
        RefreshData,
        filter,
        archiveData,
    };
};

export default useSearchArchive;
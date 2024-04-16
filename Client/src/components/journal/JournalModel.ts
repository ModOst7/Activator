import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScenario } from "../scenarioEditor/scenario/Scenario";

export interface IJournalRecord {
    id: number;
    isSuccess: boolean;
    date: Date;
    description?: string;
    username: string;
    productname?: string;
    action: string;
    licenseType?: string;
    licenseDays?: number;
    scenarios?: IScenario[];
    vendorCode?: string;
}

type RootState = {
    recordsData: IJournalRecord[];
    allRecordsData: IJournalRecord[];
    filterByUser: string;
    filterByProduct: string;
    filterByAction: string;
    datetimeStart: Date | null;
    datetimeEnd: Date | null;
    sortingByName: boolean;
    sortingByDate: boolean;
};

const initialState: RootState = {
    recordsData: [],
    allRecordsData: [],
    filterByUser: "",
    filterByProduct: "",
    filterByAction: "",
    datetimeStart: new Date((new Date()).setDate((new Date()).getDate() - 1)),
    datetimeEnd: new Date(),
    sortingByName: false,
    sortingByDate: false,
};

export const model = createSlice({
    name: "searchRecordsModel",
    initialState,
    reducers: {
        setRecordsData: (state, action: PayloadAction<IJournalRecord[]>) => {
            state.recordsData = action.payload;
        },
        setAllRecordsData: (state, action: PayloadAction<IJournalRecord[]>) => {
            state.allRecordsData = action.payload;
        },
        setFilterByUser: (state, action: PayloadAction<string>) => {
            state.filterByUser = action.payload;
        },
        setFilterByProduct: (state, action: PayloadAction<string>) => {
            state.filterByProduct = action.payload;
        },
        setFilterByAction: (state, action: PayloadAction<string>) => {
            state.filterByAction = action.payload;
        },
        setDatetimeStart: (state, action: PayloadAction<Date | null>) => {
            state.datetimeStart = action.payload;
        },
        setDatetimeEnd: (state, action: PayloadAction<Date | null>) => {
            state.datetimeEnd = action.payload;
        },

        setSortingByName: (state, action: PayloadAction<boolean>) => {
            state.sortingByName = action.payload;
        },
        setSortingByDate: (state, action: PayloadAction<boolean>) => {
            state.sortingByDate = action.payload;
        },
    },
});

export const {
    setRecordsData,
    setAllRecordsData,
    setFilterByUser,
    setFilterByProduct,
    setFilterByAction,
    setDatetimeStart,
    setDatetimeEnd,
} = model.actions;

export default model.reducer;
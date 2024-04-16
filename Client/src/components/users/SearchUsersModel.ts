import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/redux/features/rootSlice";

export enum TypeRights {
  user = "user",
  administrator = "administrator",
}

export interface ISearchUserElement {
  id: number;
  type: TypeRights;
  fullname: string;
  date: string;
  login: string;
  password: string;
}

type RootState = {
  usersData: IUser[];
  allUsersData: IUser[];
  filter: string;
  sortingByName: boolean | undefined;
  sortingByDate: boolean | undefined;
  datetimeStart: Date | undefined;
  datetimeEnd: Date | undefined;
};

const initialState: RootState = {
  usersData: [],
  allUsersData: [],
  filter: "",
  sortingByName: undefined,
  sortingByDate: undefined,
  datetimeStart: undefined,
  datetimeEnd: new Date(),
};

export const model = createSlice({
  name: "searchUsersModel",
  initialState,
  reducers: {
    setSortingByName: (state, action: PayloadAction<boolean | undefined>) => {
        state.sortingByName = action.payload;
      },
    setSortingByDate: (state, action: PayloadAction<boolean | undefined>) => {
        state.sortingByDate = action.payload;
    },
    setUsersData: (state, action: PayloadAction<IUser[]>) => {
      state.usersData = action.payload;
    },
    setAllUsersData: (state, action: PayloadAction<IUser[]>) => { 
      state.allUsersData = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setDatetimeStart: (state, action: PayloadAction<Date | undefined>) => {
      state.datetimeStart = action.payload;
    },
    setDatetimeEnd: (state, action: PayloadAction<Date | undefined>) => {
      state.datetimeEnd = action.payload;
    },
  },
});

export const {
  setDatetimeStart,
  setDatetimeEnd,
  setUsersData,
  setAllUsersData,
  setFilter,
  setSortingByName,
  setSortingByDate,
} = model.actions;

export default model.reducer;
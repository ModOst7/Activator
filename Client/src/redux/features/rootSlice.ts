import useHeaderController from "@/components/header/HeaderController";
import config from "@/utilities/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import axios from "axios";
import { TypeRights } from "@/components/users/SearchUsersModel";

export interface IUser {
  id: number;
  name: string;
  password: string;
  login: string;
  createdDate: Date;
  type: TypeRights;
}

export enum ErorStatusType {
  NotFound = 404,
  None = 0,
}
const apiClient = axios.create({
  baseURL: config.api,
  headers:{"Authorization":"123132"}
});

type RootState = {
  value: number;
  axios: AxiosInstance;
  user?: IUser;
  isAuth: boolean;
  token: string;
  errorStatus: ErorStatusType;
};

const initialState: RootState = {
  value: 12,
  axios: apiClient,
  isAuth: false,
  token: "",
  errorStatus: ErorStatusType.None,
};

export const root = createSlice({
  name: "root",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    LogOut: (state) => {
      state.token = "";
      state.user = undefined;
      state.isAuth = false;
    },
    setErrorStatus: (state, action: PayloadAction<ErorStatusType>) => {
      state.errorStatus = action.payload;
    },
    setAxios:(state, action: PayloadAction<AxiosInstance>) => {
      state.axios = action.payload;
    }
  },
});

export const {
  reset,
  setIsAuth,
  setUser,
  LogOut,
  setErrorStatus,
  setAxios
} = root.actions;

export default root.reducer;

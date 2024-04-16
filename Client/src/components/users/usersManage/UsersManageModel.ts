import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchUserElement } from "../SearchUsersModel";
import { IUser } from "@/redux/features/rootSlice";
/*
export interface ISearchUserElement {
  id: number;
  adminStatus: boolean;
  fullname: string;
  date: string;
  login: string;
  password: string;
}*/

export enum operations {add, edit};

type RootState = {
    operationStatus: operations.add | operations.edit;
    user: IUser | undefined;
    visible: boolean;
    visibleQuestion: boolean;
};

const initialState: RootState = {
    operationStatus: operations.add,
    user: undefined,
    visible: false,
    visibleQuestion: false,
};

export const model = createSlice({
  name: "usersManageModel",
  initialState,
  reducers: {
    setOperationStatus: (state, action: PayloadAction<operations>) => {
        state.operationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
        state.visible = action.payload;
    },
    setVisibleQuestion: (state, action: PayloadAction<boolean>) => {
      state.visibleQuestion = action.payload;
    }
  },
});

export const {
    setOperationStatus,
    setUser,
    setVisible,
    setVisibleQuestion,
} = model.actions;

export default model.reducer;
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/rootSlice";
import headerModel from "@/components/header/HeaderModel";
import searchModel from "@/components/search/SearchModel";
import searchUsersModel from "@/components/users/SearchUsersModel";
import usersManageModel from "@/components/users/usersManage/UsersManageModel";
import searchArchiveModel from "@/components/archive/SearchArchiveModel";
import journalModel from "@/components/journal/JournalModel";

import {} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    rootReducer,
    headerModel,
    searchModel,
    searchUsersModel,
    usersManageModel,
    searchArchiveModel,
    journalModel,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

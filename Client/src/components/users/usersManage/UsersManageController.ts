"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    setOperationStatus,
    setVisible,
    setUser,
    setVisibleQuestion,
    operations,
} from "./UsersManageModel";

import { IUser } from "@/redux/features/rootSlice";
import { TypeRights } from "../SearchUsersModel";
import { useCallback, useEffect, useMemo, useState } from "react";

import useAPI from "@/hooks/useAPI";


const useUsersManage = () => {
  const user = useAppSelector((state) => state.usersManageModel.user);
    const dispatch = useAppDispatch();
    const api = useAPI();
    
    const SetVisible = (value: boolean) => {
        dispatch(setVisible(value));
      };

    const SetOperationStatus = (operationStatus: operations) => {
        dispatch(setOperationStatus(operationStatus));
    }

    const SetUser = (user: IUser) => {
        dispatch(setUser(user));
    }

    const OpenUsersManager = (operationStatus: operations) => {
        SetVisible(true);
        SetOperationStatus(operationStatus);
    }

    const GetVisible = () => {
        return useAppSelector((state) => state.usersManageModel.visible);
    }

    const GetOperationStatus = () => {
        return useAppSelector((state) => state.usersManageModel.operationStatus);
    }

    const GetUser = () => {
        return useAppSelector((state) => state.usersManageModel.user);
    }

    const ArchiveUser = (user : IUser) => {
      return api.AddToArchive(user.id, user.name, user.type);
    }

    const CloseQuestions = () => {
        dispatch(setVisibleQuestion(false));
      };
    
      const OpenQuestion = () => {
        dispatch(setVisibleQuestion(true));
      };
    
      const GetQuestionVisible = () => {
        return useAppSelector((state) => state.usersManageModel.visibleQuestion);
      };

      const AddUser = (name: string, userRights: TypeRights, login: string, password: string) => {
        return api.AddUser(name, userRights, login, password);
      }

      const EditUser = (id: number, name: string, userRights: TypeRights, login: string, password: string) => {
        return api.EditUser(id, name, userRights, login, password);
      }

    return {
        SetVisible,
        SetOperationStatus,
        SetUser,
        GetUser,
        ArchiveUser,
        GetOperationStatus,
        OpenUsersManager,
        GetVisible,
        CloseQuestions,
        OpenQuestion,
        GetQuestionVisible,
        AddUser,
        EditUser,
        user,
    };
};

export default useUsersManage;
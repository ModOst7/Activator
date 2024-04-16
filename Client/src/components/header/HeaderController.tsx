import React from "react";
import { useDispatch } from "react-redux";
import { reset, setOpenMenuUser, setVisibleQuestion } from "./HeaderModel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { IUser, LogOut } from "@/redux/features/rootSlice";

function HeaderController() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getPostion = () => {
    return "12";
  };

  const SetOpenUserCard = (state: boolean) => {
    console.log(state, "state");
    dispatch(setOpenMenuUser(state));
  };

  const GetOpenUserMenu = () => {
    return useAppSelector((state) => state.headerModel.isOpenUserMenu);
  };

  const GetUser = () => {
    return useAppSelector((state) => state.rootReducer.user);
  };

  const QuitApp = () => {
    localStorage.setItem("token", "");

    router.push("/login");
    dispatch(LogOut());
    dispatch(reset());
  };

  const CloseQuestions = () => {
    dispatch(setVisibleQuestion(false));
  };

  const OpenQuestion = () => {
    dispatch(setVisibleQuestion(true));
  };

  const GetQuestionVisible = () => {
    return useAppSelector((state) => state.headerModel.isVisibleQuestion);
  };

  return {
    GetOpenUserMenu,
    SetOpenUserCard,
    GetUser,
    QuitApp,
    CloseQuestions,
    OpenQuestion,
    GetQuestionVisible,
  };
}

export default HeaderController;

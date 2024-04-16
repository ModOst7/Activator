"use client";
import React, { useEffect } from "react";
import styles from "./header.module.css";
import ButtonPage from "../buttons/buttonPage/ButtonPage";
import { useRouter } from "next/router";
import AddIcon from "../icons/AddIcon";
import HomeIcon from "../icons/HomeIcon";
import ArhiveIcon from "../icons/ArhiveIcon";
import UsersIcon from "../icons/UsersIcon";
import LogsIcon from "../icons/LogsIcon";
import UserButton from "../buttons/userButton/UserButton";
import useHeaderController from "./HeaderController";
import Question from "../question/Question";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import HeaderController from "./HeaderController";

function Header() {
  const user = useAppSelector((state) => state.rootReducer.user);
  console.log(user);
  const headerController = useHeaderController();
  const ClickToOpenPage = () => {
    headerController?.SetOpenUserCard(false);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.buttons_page}>
          <ButtonPage
            OnClick={ClickToOpenPage}
            href="/search"
            icon={<HomeIcon />}
          />
          <Delimiter />
          <ButtonPage OnClick={ClickToOpenPage} icon={<AddIcon />} href="/generator/add">
            Создать генератор ключей
          </ButtonPage>
          <Delimiter />
          <ButtonPage
            OnClick={ClickToOpenPage}
            href="/arhive"
            icon={<ArhiveIcon />}
          >
            Архив
          </ButtonPage>
          <Delimiter />
          {user?.type == "administrator" && <ButtonPage
            OnClick={ClickToOpenPage}
            icon={<UsersIcon />}
            href="/users"
          >
            Профили пользователей
          </ButtonPage>}
          <Delimiter />
          {user?.type == "administrator" && <ButtonPage
            OnClick={ClickToOpenPage}
            icon={<LogsIcon />}
            href="/journal"
          >
            Просмотр логов
          </ButtonPage>}
        </div>
        <div className={styles.user}>
          <Delimiter />
          <UserButton
            select={headerController.GetOpenUserMenu()}
            setSelect={headerController.SetOpenUserCard}
            user={headerController.GetUser()}
            onClickExitButton={headerController.OpenQuestion}
          />
        </div>
      </div>
      {headerController.GetQuestionVisible() && (
        <Question
          OnClickAccept={headerController.QuitApp}
          OnClickDismiss={headerController.CloseQuestions}
        >
          <b>Вы действительно хотите <br />выйти из аккаунта?</b>
        </Question>
      )}
    </>
  );
}

const Delimiter = () => {
  return <div className={styles.delimiter}></div>;
};

export default Header;

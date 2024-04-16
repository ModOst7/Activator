"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./login.module.css";
import Input, { TypeErrorInput } from "@/components/input/Input";
import opne_eye from "@/icons/eye_open.png";
import close_eye from "@/icons/eye_close.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Eye from "@/components/icons/Eye";
import UserIcon from "@/components/icons/UserIcon";
import LockIcon from "@/components/icons/LockIcon";
import { redirect, useRouter } from "next/navigation";
import { IUser, setIsAuth, setUser } from "@/redux/features/rootSlice";
import { IAuthData } from "@/providers/AuthPovider";
import Button from "@/components/buttons/button/Button";

function Login() {
  const axios = useAppSelector((state) => state.rootReducer.axios);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.rootReducer.isAuth);
  const [login, SetLogin] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordVisible, SetPasswordVisible] = useState(false);
  const [error, SetError] = useState(TypeErrorInput.none);
  const [disableButton, SetDisableButton] = useState(false);
  const router = useRouter();
  const Login = useCallback(() => {
    console.log(login, password);
    SetDisableButton(true);
    if (password == "" || login == "") {
      SetError(TypeErrorInput.emptyData);
      SetDisableButton(false);
    } else if (password !== "" || login !== "") {
      axios
        .post("/login", { login, password })
        .then((response) => {
          const data: IAuthData = response.data;

          try {
            if (data.isAuth) {
              const userData: IUser = {
                id: data.user.id,
                name: data.user.name,
                type: data.user.type,
                login: "",
                password: "",
                createdDate: new Date()
              };
              SetError(TypeErrorInput.none);
              router.push("/search");
              localStorage.setItem("token", data.token);
              dispatch(setUser(userData));
              dispatch(setIsAuth(true));
              //SetDisableButton(false);
              //router.push("/search");
            } else {
              SetError(TypeErrorInput.wrongData);
              SetDisableButton(false);
            }
          } catch {
            SetError(TypeErrorInput.wrongData);
            SetDisableButton(false);
          }

          console.log(response.data);
        })
        .catch(() => {
          SetDisableButton(false);
        });
    }
  }, [axios, dispatch, login, password, router]);

  useEffect(() => {
    if (isAuth) redirect("/search");
  }, [isAuth]);

  const messageClass = useMemo(() => {
    if (error == TypeErrorInput.emptyData) {
      return styles.message_empty_data;
    } else if (error == TypeErrorInput.wrongData) {
      return styles.message_wrong_data;
    }
    return "";
  }, [error]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.text_description}>
          Добро пожаловать <br />в
          <div className={styles.text_select}> Активатор программ</div>
        </div>

        <Input
          className={styles.input_field}
          placeholder="Введите логин"
          iconDefault={<UserIcon />}
          error={error}
          OnChange={(data: string) => {
            SetLogin(data);
          }}
        />

        <Input
          className={styles.input_field}
          icon={<Eye isOpen={passwordVisible} />}
          iconDefault={<LockIcon />}
          type={passwordVisible ? "text" : "password"}
          OnClickIcon={() => SetPasswordVisible(!passwordVisible)}
          placeholder="Введите пароль"
          error={error}
          OnChange={(data: string) => {
            SetPassword(data);
          }}
        />
        <div className={[styles.message, messageClass].join(" ")}>
          {error == TypeErrorInput.emptyData && "Введите необходимые данные"}
          {error == TypeErrorInput.wrongData &&
            "Введены неверные данные. Попробуйте еще раз"}
        </div>
        <Button
          disabled={disableButton}
          OnClick={Login}
          className={styles.button}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default Login;

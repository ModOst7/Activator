"use client";
import Loader from "@/components/loaders/Loader";
import { IUser, setAxios, setIsAuth, setUser } from "@/redux/features/rootSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, redirect } from "next/navigation";
import React, { ReactNode, useEffect, useReducer, useState } from "react";
import axios,{ Axios, AxiosInstance } from "axios";
import config from "@/utilities/config";

export interface IAuthData {
  isAuth: boolean;
  token: string;
  user: IUser;
}

function AuthPovider(props: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, SetLoading] = useState(true);
  const isAuth = useAppSelector((state) => state.rootReducer.isAuth);
  const axiosApi = useAppSelector((state) => state.rootReducer.axios);
  
  useEffect(() => {
    console.log(localStorage.getItem("token") == "");
    const token = localStorage.getItem("token");
    if (token == "" || token == null) {
      router.push("/login");
      SetLoading(false);
    } else {
      axiosApi.get(`/auth/${token}`).then((response) => {
        try {
          const data: IAuthData = response.data;
          if (data.isAuth) {
            if (["/", "/login"].includes(window.location.pathname)) {
              router.push("/search");
            }
            dispatch(setIsAuth(true));
            dispatch(setUser(data.user));
            setTimeout(() => {
              SetLoading(false);
            }, 1500);

            //if (window.location.pathname.concat(...["/", "/login"])) {
            //  router.push("/search");
            //}
          } else {
            throw new Error("Invalid");
          }
        } catch (e) {
          setTimeout(() => {
            SetLoading(false);
            router.push("/login");
          }, 2000);

          console.log(e);
        }
        console.log(response.data);
      });
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("token"), isAuth)
      const token = `Bearer  ${localStorage.getItem("token")}`
      const axiosInstnce = axios.create({
        baseURL:config.api,
        headers:{
          Authorization:token
        }
      })
      dispatch(setAxios(axiosInstnce))
  },[isAuth])

  const user = useAppSelector((state) => state.rootReducer.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return <>{isLoading ? <Loader /> : props.children}</>;
}

export default AuthPovider;

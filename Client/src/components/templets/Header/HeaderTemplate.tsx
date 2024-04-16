"use client";
import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Error from "next/error";
import { ErorStatusType } from "@/redux/features/rootSlice";
import HeaderController from "../../header/HeaderController";
import Header from "../../header/Header";
import styles from "./style.module.css";

function HeaderTemplate(props: { children: ReactNode }) {
  const isAuth = useAppSelector((state) => state.rootReducer.isAuth);
  const errorStatus = useAppSelector((state) => state.rootReducer.errorStatus);
  useEffect(() => {
    console.log();
  }, []);
  return (
    <>
      {isAuth && errorStatus == ErorStatusType.None && <Header />}
      {isAuth && <div className={styles.root_header_children}>{props.children}</div>}
      {!isAuth && props.children}
    </>
  );
}

export default HeaderTemplate;

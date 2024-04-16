"use client";
import React, { Children, ReactNode, useEffect, useState } from "react";
import styles from "./buttonPage.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ButtonPage(props: {
  children?: ReactNode;
  href?: string;
  isSelected?: boolean;
  icon?: ReactNode;
  select?: boolean;
  OnClick?: () => void;
}) {
  //useEffect(() => {
  //  if (location == props.href) {
  //    setSelect(true);
  //  } else {
  //    setSelect(false);
  //  }
  //  console.log(location);
  //}, [location, props.href]);
  return (
    <Link
      className={[styles.root, props.select && styles.select].join(" ")}
      href={props.href ? props.href : ""}
      onClick={props.OnClick}
    >
      {props.icon && (
        <div
          style={{ margin: props.children ? "" : "0" }}
          className={styles.icon}
        >
          {props.icon}
        </div>
      )}
      {props.children}
      <div
        className={[
          styles.select_div,
          props.select && styles.selected_div,
        ].join(" ")}
      ></div>
    </Link>
  );
}

export default ButtonPage;

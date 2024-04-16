"use client";
import React from "react";
import styles from "./loader.module.css";
import { InfinitySpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className={styles.wrapper}>
      <InfinitySpin />
    </div>
  );
}

export default Loader;

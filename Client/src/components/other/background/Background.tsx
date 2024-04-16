import React, { ReactNode } from "react";
import styles from "./style.module.css";

function Background(props: { className?: string; children?: ReactNode }) {
  return (
    <div className={[styles.root, props.className].join(" ")}>
      {props.children}
    </div>
  );
}

export default Background;

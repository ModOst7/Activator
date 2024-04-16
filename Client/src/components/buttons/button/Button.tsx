import React, { ReactNode } from "react";
import styles from "./button.module.css";

function Button(props: {
  className?: string;
  children?: ReactNode;
  OnClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={props.OnClick}
      className={[
        styles.button,
        props.className,
        props.disabled && styles.button_disabled,
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}

export default Button;

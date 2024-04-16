import React, {
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles, { icon } from "./input.module.css";
import Image, { StaticImageData } from "next/image";
import { JsxElement } from "typescript";

export enum TypeErrorInput {
  wrongData = 1,
  emptyData = 2,
  none = 3,
}

const Input = (props: {
  className?: string;
  type?: HTMLInputTypeAttribute;
  data?: string;
  icon?: ReactNode;
  iconDefault?: ReactNode;
  OnClickIcon?: () => void;
  OnChange?: (data: string) => void | void;
  placeholder?: string;
  error?: TypeErrorInput;
}) => {
  const error = useMemo(() => {
    return props.error;
  }, [props.error]);

  const inputClass = useMemo(() => {
    if (error == TypeErrorInput.emptyData) {
      return styles.input_empty_data;
    } else if (error == TypeErrorInput.wrongData) {
      return styles.input_wrong_data;
    }
    return styles.input;
  }, [error]);

  const OnFocus = () => {
    //console.log(props.icon);
  };

  const [data, SetData] = useState("");

  useEffect(() => {
    if (props.OnChange) props?.OnChange(data);
    
  }, [data, props.OnChange]);

  return (
    <div className={[styles.card, props.className].join(" ")}>
      <div className={styles.icon_card}>
        <div className={[styles.icon, styles.icon_left].join(" ")}>
          {props.iconDefault}
        </div>
      </div>
      <input
        onFocus={OnFocus}
        className={[styles.input, inputClass].join(" ")}
        type={props.type}
        onChange={(e) => {
          SetData(e.currentTarget.value);
        }}
        placeholder={props.placeholder}
        value={data}
      />
      <div className={styles.icon_card}>
        <div
          onClick={props.OnClickIcon}
          className={[styles.icon, styles.icon_event].join(" ")}
        >
          {props.icon}
        </div>
      </div>
    </div>
  );
};

export default Input;

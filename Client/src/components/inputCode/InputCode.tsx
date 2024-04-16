import React, {
    HTMLInputTypeAttribute,
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import styles from "./styles.module.css";

  export enum StatusCode {
    wrongKey = 0,
    ok = 1,
    none = 2,
}
  
  const InputCode = (props: {
    className?: string;
    type?: HTMLInputTypeAttribute;
    data?: string;
    icon?: ReactNode;
    iconDefault?: ReactNode;
    iconStatus?: ReactNode;
    OnClickIcon?: () => void;
    OnChange?: (data: string) => void | void;
    placeholder?: string;
    status?: StatusCode;
  }) => {
    const status = useMemo(() => {
      return props.status;
    }, [props.status]);
  
    const inputClass = useMemo(() => {
      if (status == StatusCode.wrongKey) {
        return styles.input_wrong_key;
      } else if (status == StatusCode.ok) {
        return styles.input_ok;
      }
      //return styles.input;
    }, [status]);
  
    const OnFocus = () => {
      console.log(props.icon);
    };
  
    const [data, SetData] = useState("");
  /*
    useEffect(() => {
      if (props.OnChange) props?.OnChange(data);
    }, [data, props.OnChange]);*/
  
    return (
      <div className={[styles.card, props.className, inputClass].join(" ")}>
        <input
          onFocus={OnFocus}
          className={[styles.input].join(" ")}
          type={props.type}
          onChange={(e) => {
            if (props?.OnChange) props?.OnChange(e.currentTarget.value);
          }}
          placeholder={props.placeholder}
          value={props.data}
        />
        <div className={styles.copypaste_icon} onClick={props.OnClickIcon}>
            {props.icon}
        </div>
        <div className={styles.icon_card}>
          <div
            className={[styles.icon, styles.icon_event].join(" ")}
          >
            {props.iconStatus}
          </div>
        </div>
      </div>
    );
  };
  
  export default InputCode;
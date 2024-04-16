"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "../icons/SearchIcon";
import SettingsIcon from "../icons/SettingsIcon";

function InputSearch(props: {
  className?: string;
  placeholder?: string;
  OnFocus?: () => void;
  OnBlur?: () => void;
  value?: string;
  SetValue?: (value: string) => void;
  showSettings?: (value: boolean) => void;
  dateStart?: Date | null;
  dateEnd?: Date | null;
}) {
  const [value, setValue] = useState("");
  return (
    <div className={[styles.root, props.className].join(" ")}>
      <div className={styles.wrapper}>
        <div className={styles.icon_left}>
          <SearchIcon />
        </div>

        <input
          onFocus={props.OnFocus}
          onBlur={props.OnBlur}
          className={styles.input}
          placeholder={props.placeholder}
          value={props.value != undefined ? props.value : value}
          onChange={(e) => {
            if (props.SetValue) {
              props.SetValue(e.target.value);
            } else {
              setValue(e.target.value);
            }
          }}
        />
        <div 
        onClick={() => props.showSettings ? props.showSettings(true) : undefined } 
        className={[styles.icon_right, (props.dateStart && props.dateEnd) ? styles.filter_active : ""].join(" ")}>
          <SettingsIcon />{<div className={styles.datefilter_text}>{props.dateStart?.toLocaleDateString()} - {props.dateEnd?.toLocaleDateString()}</div>}
        </div>
      </div>
    </div>
  );
}

export default InputSearch;

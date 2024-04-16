import React, { useState, useEffect } from "react";
import styles from "./options.module.css";
import { TypeErrorInput } from "../input/Input";

function Options(props: {
    className?: string;
    options: string[];
    currentOption: string;
    setOption?: (option: string) => void;
    error?: TypeErrorInput;
}) {
    const pickOption = (option: string) => {
        setIsOpen(false);
        if (props.setOption)
            props.setOption(option);

    }

    const onToggle = (e: React.MouseEvent<HTMLElement>) => {
        setIsOpen(!isOpen);
        e.preventDefault();
    }

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.wrapper}>
            <details
                onClick={(e) => { onToggle(e); }}
                className={[
                    styles.custom_select,
                    props.error === TypeErrorInput.emptyData && styles.empty_data
                ].join(" ")}
                open={isOpen}
            >
                <summary className={styles.summary}>
                    <div className={styles.picked_option + " " + (props.options.includes(props.currentOption) ? styles.picked : "")}>{props.currentOption ? props.currentOption : "Выберите тип прав"}</div>
                </summary>
                {props.options?.map((item, i) => (
                    <div onClick={() => pickOption(item)} className={styles.option} key={i}>{item}</div>
                ))}
            </details>
        </div>
    );
}

export default Options;
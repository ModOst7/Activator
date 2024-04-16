import React, { useState, useEffect } from "react";
import styles from "./options.module.css";
import { TypeErrorInput } from "../input/Input";

function OptionsDatetime(props: {
    className?: string;
    options: string[];
    currentOption: string;
    setOption: (option: string) => void;
    setDatetime: (option?: Date, option2?: Date) => void;
    setPicker: (value: boolean) => void;
    error?: TypeErrorInput;
}) {
    const pickOption = (option: string, i: number, arrayLength: number) => {
        console.log(i + " " + arrayLength);
        props.setOption(option);
        setIsOpen(false);

        function subtractHours(date: Date, hours: number) {
            date.setHours(date.getHours() - hours);

            return date;
        }

        function subtractDays(date: Date, days: number) {
            date.setHours(date.getHours() - days * 24);

            return date;
        }

        switch (option) {
            case "Последний час":
                props.setDatetime(subtractHours(new Date, 1), new Date);
                break;
            case "Последние 12 часов":
                props.setDatetime(subtractHours(new Date, 12), new Date);
                break;
            case "Последние 24 часа":
                props.setDatetime(subtractHours(new Date, 24), new Date);
                break;
            case "Последние 7 дней":
                props.setDatetime(subtractDays(new Date, 7), new Date);
                break;
            case "Последние 30 дней":
                props.setDatetime(subtractDays(new Date, 30), new Date);
                break;
            case "Указать диапазон дат":
                props.setPicker(true);
            default:
                break;
        }


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
                    <div className={styles.picked_option + " " + ((props.currentOption != "Выбрать")  ? styles.picked : "")}>{props.currentOption ? props.currentOption : "Выбрать"}</div>
                </summary>
                {props.options?.map((item, i, arr) => (
                    <div onClick={() => pickOption(item, i, arr.length)} className={styles.option} key={i}>{item}</div>
                ))}
            </details>
        </div>
    );
}

export default OptionsDatetime;
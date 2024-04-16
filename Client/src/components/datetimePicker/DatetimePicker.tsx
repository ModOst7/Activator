import React, { useState, useRef, useMemo, useEffect, useImperativeHandle } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import closeIcon from "@/icons/close_manager.svg";
import DatepickIcon from "../icons/DatepickIcon";
import Button from "../buttons/button/Button";
import Timepicker from "../timepicker/Timepicker";

import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // the locale you want
registerLocale("ru", ru);
//import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import { TypeErrorInput } from "../input/Input";

function DatetimePicker(props: {
    isVisible: boolean;
    setVisible(value: boolean): void;
    setDatetime: (option?: Date, option2?: Date) => void;
    className?: string;
    setDatetimeformatted: (date: string) => void;
}) {
    const datepickIcon = <svg className={styles.datepick_icon} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" >
        <path d="M10 12H8V14H10V12ZM14 12H12V14H14V12ZM18 12H16V14H18V12ZM20 5H19V3H17V5H9V3H7V5H6C4.89 5 4 5.9 4 7V21C4 21.5304 4.21071 22.0391 4.58579 22.4142C4.96086 22.7893 5.46957 23 6 23H20C20.5304 23 21.0391 22.7893 21.4142 22.4142C21.7893 22.0391 22 21.5304 22 21V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5ZM20 21H6V10H20V21Z" />
    </svg>

    const [dateStart, setDateStart] = useState<Date | undefined>();
    const [dateEnd, setDateEnd] = useState<Date | undefined>();
    const [timeStart, setTimeStart] = useState("00:00:00");
    const [timeEnd, setTimeEnd] = useState("00:00:00");

    const selectStartDate = (d: Date) => {
        setDateStart(d);
    }

    const selectEndDate = (d: Date) => {
        setDateEnd(d);
    }



    const changeDatetimeFilter = () => {
        props.setVisible(false);
        if (dateStart && dateEnd) {
            let datetimeStart = new Date(
                dateStart.getFullYear(),
                dateStart.getMonth(),
                dateStart.getDate(),
                parseInt(timeStart.split(":")[0]),
                parseInt(timeStart.split(":")[1]),
                parseInt(timeStart.split(":")[2]),
                0
            );
            let datetimeEnd = new Date(
                dateEnd.getFullYear(),
                dateEnd.getMonth(),
                dateEnd.getDate(),
                parseInt(timeEnd.split(":")[0]),
                parseInt(timeEnd.split(":")[1]),
                parseInt(timeEnd.split(":")[2]),
                0
            );
            props.setDatetime(datetimeStart, datetimeEnd);
            props.setDatetimeformatted(datetimeStart.toLocaleDateString() + " – " + datetimeEnd.toLocaleDateString())
            return;
        }
        props.setDatetimeformatted("Выбрать");

    }

    const closeWindow = () => {
        props.setVisible(false);
        if (!dateStart || !dateEnd)
        props.setDatetimeformatted("Выбрать");
    }

    useEffect(() => {
        //console.log(new Date(dateStart + ' ' + timeStart))
        /*if (dateStart) {
            console.log(new Date(
                dateStart.getFullYear(),
                dateStart.getMonth(),
                dateStart.getDate(),
                parseInt(timeStart.split(":")[0]),
                parseInt(timeStart.split(":")[1]),
                parseInt(timeStart.split(":")[2]),
                0
            ))
        }*/

    }, [dateStart])


    return (
        <>
            <div className={[styles.bg_screen, props.isVisible ? styles.opened : styles.closed].join(" ")}>
                <div className={styles.manage_window}>
                    <div className={styles.header}>
                        <div className={styles.header_text}><b>Укажите</b> диапазон дат для фильтра</div>
                    </div>
                    <div className={styles.datetime_picker}>
                        <div className={styles.datetime_start}>
                            <div className={styles.pickers_text}>Начало</div>
                            <div className={styles.pickers_block}>
                                <DatePicker
                                    toggleCalendarOnIconClick
                                    selectsStart
                                    showIcon
                                    selected={dateStart}
                                    onChange={selectStartDate}
                                    icon={datepickIcon}
                                    locale={ru}
                                    startDate={dateStart}
                                    endDate={dateEnd}
                                    placeholderText="Укажите дату"
                                    popperClassName={"datetime_picker_start"}
                                />
                                <Timepicker
                                    time={timeStart}
                                    setTime={setTimeStart}
                                />
                            </div>
                        </div>
                        <div className={styles.datetime_start}>
                            <div className={styles.pickers_text}>Конец</div>
                            <div className={styles.pickers_block}>
                                <DatePicker
                                    toggleCalendarOnIconClick
                                    selectsEnd
                                    showIcon
                                    selected={dateEnd}
                                    onChange={selectEndDate}
                                    icon={datepickIcon}
                                    locale={ru}
                                    startDate={dateStart}
                                    endDate={dateEnd}
                                    minDate={dateStart}
                                    placeholderText="Укажите дату"
                                    popperClassName={"datetime_picker_end"}
                                />
                                <Timepicker
                                    time={timeEnd}
                                    setTime={setTimeEnd}
                                />
                                {/*<div onClick={onUp}>клик</div>
                                <div className={styles.timepicker_block}>
                                    <input className={styles.timepicker_input} type="time" step="1" ref={timeEndRef} />
                                </div>*/}
                            </div>
                        </div>
                        <div className={styles.button_block}>
                            <Button className={styles.button} OnClick={changeDatetimeFilter}>Применить</Button>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.close_window}
                    onClick={closeWindow}
                >
                    <Image width={60} height={60} src={closeIcon} alt={""} />
                </div>
            </div>
        </>
    )
}

export default DatetimePicker;
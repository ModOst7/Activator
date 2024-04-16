import React, { useState, useRef, useMemo, useEffect, useImperativeHandle } from "react";
import styles from "./datefilter.module.css";
import Image from "next/image";
import closeIcon from "@/icons/close_manager.svg";
import DatepickIcon from "../icons/DatepickIcon";
import Button from "../buttons/button/Button";
import Timepicker from "../timepicker/Timepicker";
import FilterIcon from "../icons/FilterIcon";

import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // the locale you want
registerLocale("ru", ru);
//import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import { TypeErrorInput } from "../input/Input";

function DateFilter(props: {
    isVisible: boolean;
    setVisible(value: boolean): void;
    setDatetime: (option?: Date, option2?: Date) => void;
    className?: string;
}) {
    const datepickIcon = <svg className={styles.datepick_icon} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" >
        <path d="M10 12H8V14H10V12ZM14 12H12V14H14V12ZM18 12H16V14H18V12ZM20 5H19V3H17V5H9V3H7V5H6C4.89 5 4 5.9 4 7V21C4 21.5304 4.21071 22.0391 4.58579 22.4142C4.96086 22.7893 5.46957 23 6 23H20C20.5304 23 21.0391 22.7893 21.4142 22.4142C21.7893 22.0391 22 21.5304 22 21V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5ZM20 21H6V10H20V21Z" />
    </svg>

    const [dateStart, setDateStart] = useState<Date | undefined>();
    const [dateEnd, setDateEnd] = useState<Date | undefined>();

    const [dateFilter, setDateFilter] = useState(0);

    const resetFilters = () => {
        setDateFilter(0);
        setDateStart(undefined);
        setDateEnd(undefined);
    }

    const selectStartDate = (d: Date) => {
        setDateStart(d);
    }

    const selectEndDate = (d: Date) => {
        setDateEnd(d);
    }

    function subtractHours(date: Date, hours: number) {
        date.setHours(date.getHours() - hours);

        return date;
    }

    function subtractDays(date: Date, days: number) {
        date.setHours(date.getHours() - days * 24);

        return date;
    }

    const changeDatetimeFilter = () => {
        props.setVisible(false);
        if (dateStart && dateEnd) {
            let datetimeStart = new Date(
                dateStart.getFullYear(),
                dateStart.getMonth(),
                dateStart.getDate(),
            );
            let datetimeEnd = new Date(
                dateEnd.getFullYear(),
                dateEnd.getMonth(),
                dateEnd.getDate(),
            );
            props.setDatetime(datetimeStart, datetimeEnd);
            return;
        } else {
            props.setDatetime(undefined, undefined);
        }
        if (dateFilter)
            switch (dateFilter) {
                case 1:
                    props.setDatetime(subtractDays(new Date, 7), new Date);
                    break;
                case 2:
                    props.setDatetime(subtractHours(new Date, 24), new Date);
                    break;
                case 3:
                    props.setDatetime(subtractHours(new Date, (new Date).getHours()), new Date);
                    break;
                default:
                    break;
            }

    }

    const closeWindow = () => {
        props.setVisible(false);
    }

    useEffect(() => {
        if (dateFilter) {
            setDateStart(undefined);
            setDateEnd(undefined);
        }
    }, [dateFilter])



    return (
        <>
            <div className={[styles.bg_screen, props.isVisible ? styles.opened : styles.closed, props.className].join(" ")}>
                <div className={styles.manage_window}>
                    <div className={styles.header}>
                        <div className={styles.header_text}><b>Укажите настройки для фильтра поиска</b></div>
                    </div>
                    <div className={styles.datefilter_block}>
                        <div className={styles.datefilter_text}>Диапазон дат</div>
                        <div className={styles.datefilter_variants}>
                            <div onClick={() => setDateFilter(1)} className={[styles.datefilter_variant, dateFilter == 1 ? styles.active : ""].join(" ")}>Последние 7 дней</div>
                            <div onClick={() => setDateFilter(2)} className={[styles.datefilter_variant, dateFilter == 2 ? styles.active : ""].join(" ")}>Последние 24 часа</div>
                            <div onClick={() => setDateFilter(3)} className={[styles.datefilter_variant, dateFilter == 3 ? styles.active : ""].join(" ")}>Сегодня</div>
                        </div>
                    </div>
                    <div className={styles.datetime_picker}>
                        <div className={styles.datetime_start}>
                            <div className={styles.pickers_text}>От</div>
                            <div onClick={() => { setDateFilter(0) }} className={styles.pickers_block}>
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
                            </div>
                        </div>
                        <div className={styles.datetime_end}>
                            <div className={styles.pickers_text}>До</div>
                            <div onClick={() => { setDateFilter(0) }} className={styles.pickers_block}>
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
                            </div>
                        </div>
                    </div>
                    <div className={styles.button_block}>
                        <Button className={styles.button} OnClick={changeDatetimeFilter}>Применить</Button>
                        <Button
                            OnClick={() => {
                                resetFilters();
                            }}

                        >
                            <FilterIcon />
                        </Button>
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

export default DateFilter;
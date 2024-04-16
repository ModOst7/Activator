import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import closeIcon from "@/icons/close_manager.svg";
import { IJournalRecord } from "../JournalModel";

function RecordWindow(props: {
    activeRecord: IJournalRecord | null;
    setActiveRecord(value: IJournalRecord | null): void;
}) {
    console.log(props.activeRecord)
    return (
        <>
            <div className={[styles.bg_screen, props.activeRecord ? styles.opened : styles.closed].join(" ")}>
                <div className={styles.manage_window}>
                    <div className={styles.header}>
                        <div className={styles.header_text}>Подробные сведения</div>
                    </div>
                    <div className={styles.record_data}>
                        <div className={styles.parameter}>
                            <div className={styles.left_part}>Пользователь: </div>
                            <div className={styles.right_part}>{props.activeRecord?.username}</div>
                        </div>
                        <div className={styles.parameter}>
                            <div className={styles.left_part}>Действие: </div>
                            <div className={styles.right_part}>{props.activeRecord?.action}</div>
                        </div>
                        {(props.activeRecord?.productname) ?
                            <>
                                <div className={styles.parameter}>
                                    <div className={styles.left_part}>Тренажер: </div>
                                    <div className={styles.right_part}>{props.activeRecord?.productname}</div>
                                </div>
                                <div className={styles.parameter}>
                                    <div className={styles.left_part}>Тип лицензии: </div>
                                    <div className={styles.right_part}>{(Number(props.activeRecord?.licenseType) == -1) ? "Бессрочная" : "Срочная"}{(Number(props.activeRecord?.licenseType) != -1) ? ", количество дней: " + props.activeRecord?.licenseType : ""}</div>
                                </div>
                                <div className={styles.parameter}>
                                    <div className={styles.left_part}>Включенные сценарии: </div>
                                    <div className={styles.right_part}>{props.activeRecord?.scenarios?.map((item) => item.name).join(", ")}</div>
                                </div>
                            </> : ""
                        }
                        <div className={styles.parameter}>
                            <div className={styles.left_part}>Дата и время: </div>
                            <div className={styles.right_part}>{props.activeRecord?.date.toLocaleString('ru-RU', { timeZone: 'Europe/Samara' })}</div>
                        </div>

                    </div>
                </div>
                <div
                    className={styles.close_window}
                    onClick={() => props.setActiveRecord(null)}
                >
                    <Image width={60} height={60} src={closeIcon} alt={""} />
                </div>
            </div>
        </>
    )
}

export default RecordWindow;
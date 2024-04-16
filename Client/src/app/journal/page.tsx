"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Options from "@/components/options/Options";
import OptionsDatetime from "@/components/options/OptionsDatetime";
import Input from "@/components/input/Input";
import InputData from "@/components/input/inputData";
import Button from "@/components/buttons/button/Button";
import FilterIcon from "@/components/icons/FilterIcon";
import useSearch from "@/components/search/SearchTrainingController";
import RecordWindow from "@/components/journal/recordWindow/RecordWindow";
import DatetimePicker from "@/components/datetimePicker/DatetimePicker";

import useSearchUsers from "@/components/users/SearchUsersController";
import useUsersManage from "@/components/users/usersManage/UsersManageController";
import useJournal from "@/components/journal/JournalController";

import { operations } from "@/components/users/usersManage/UsersManageModel";

import { IJournalRecord, setFilterByProduct } from "@/components/journal/JournalModel";
import ListRecords from "@/components/journal/listRecords/ListRecords";


function Search() {
    const searchUsersController = useSearchUsers();
    const usersManageController = useUsersManage();
    const journalController = useJournal();

    const [activeRecord, setActiveRecord] = useState<IJournalRecord | null>(null);
    const [records, setRecords] = useState<IJournalRecord[]>([]);
    const [datepickerVisible, setDatepickerVisible] = useState(false);

    const [datetimeFormatted, setDatetimeformatted] = useState("Выбрать");

    useEffect(() => {
        if (journalController.datetimeStart == null) {
            setDatetimeformatted("Выбрать");
        }

        /*if (journalController.datetimeStart && journalController.datetimeEnd) {
            setDatetimeformatted("Дата");
        }*/
        
    }, [journalController.datetimeStart, journalController.datetimeEnd]);

    useEffect(() => {

    }, []);
    return (
        <div className={styles.root}>
            <div className={styles.text}>Журнал событий</div>
            <div className={styles.wrapper}>
                <div className={styles.search_panel}>
                    <div className={styles.datepicker}>
                        <div className={styles.datepicker_text}>Дата и время</div>
                        <div className={styles.datepicker_block}>
                            <OptionsDatetime
                                options={[
                                    "Последний час",
                                    "Последние 12 часов",
                                    "Последние 24 часа",
                                    "Последние 7 дней",
                                    "Последние 30 дней",
                                    "Указать диапазон дат",
                                ]}
                                currentOption={datetimeFormatted}
                                setOption={setDatetimeformatted}
                                setDatetime={journalController.ChangeDatetimeFilter}
                                setPicker={setDatepickerVisible}
                            />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div className={styles.action_text}>Действие</div>
                        <div>
                            <Options
                                options={[
                                    "Добавление учетной записи",
                                    "Редактирование учетной записи",
                                    "Архивирование учетной записи",
                                    "Вход в учетную запись",
                                    "Выход из учетной записи",
                                    "Добавление генератора ключей",
                                    "Редактирование генератора ключей",
                                    "Архивирование генератора ключей",
                                    "Возврат генератора ключей из архива",
                                ]}
                                currentOption={journalController.GetFilterByAction()}
                                setOption={journalController.SetFilterByAction}
                            />
                        </div>
                    </div>
                    <div className={styles.username}>
                        <div className={styles.username_text}>Пользователь</div>
                        <div className={styles.username_block}>
                            <InputData
                                className={styles.search_input}
                                placeholder="Введите пользователя"
                                data={journalController.GetFilterByUser()}
                                OnChange={(data: string) => { journalController.SetFilterByUser(data); }}
                            />
                        </div>
                    </div>
                    <div className={styles.trainername}>
                        <div className={styles.trainername_text}>Название тренажера</div>
                        <div className={styles.trainername_block}>
                            <InputData
                                className={styles.search_input}
                                placeholder="Введите название"
                                data={journalController.filterByProduct}
                                OnChange={(data: string) => { journalController.SetFilterByProduct(data); }}
                            />
                        </div>
                    </div>
                    <Button
                        OnClick={() => {
                            journalController.ResetFilters();
                        }}
                        className={styles.button}
                    >
                        <FilterIcon />
                    </Button>
                </div>
                <ListRecords
                    setActiveRecord={setActiveRecord}
                    data={journalController.GetRecordsData()}
                />
            </div>
            {activeRecord && (
                <RecordWindow
                    activeRecord={activeRecord}
                    setActiveRecord={setActiveRecord}
                />
            )}
            
                <DatetimePicker
                    isVisible={datepickerVisible}
                    setVisible={setDatepickerVisible}
                    setDatetime={journalController.ChangeDatetimeFilter}
                    setDatetimeformatted={setDatetimeformatted}
                />
        </div>
    );
}

export default Search;
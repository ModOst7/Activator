"use client";
import React, { useState, useEffect } from "react";
import styles from "./archiveStyles.module.css";
import InputSearch from "@/components/inputSearch/InputSearch";
import Button from "@/components/buttons/button/Button";
import Question from "@/components/question/Question";
import ListSearchArchive from "@/components/archive/listSearchArchive/ListSearchArchive";
import DateFilter from "@/components/datefilter/DateFilter";

import useSearchArchive from "@/components/archive/SearchArchiveController";


function Archive() {
    const searchArchiveController = useSearchArchive();

    const [questionVisible, setQuestionVisible] = useState(false);
    const [dateFilterVisibility, setDateFilterVisibility] = useState(false);

    const removeFromArchive = () => {
        setQuestionVisible(false);
        searchArchiveController.RemoveFromArchive(searchArchiveController.archiveData);
    }

    useEffect(() => { 
        searchArchiveController.ChangeDatetimeFilter(undefined, undefined);
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.text}>Архив</div>
            <div className={styles.wrapper}>
                <div className={styles.search_panel}>
                    <InputSearch
                        className={styles.search_input}
                        placeholder="Поиск"
                        SetValue={searchArchiveController.SetFilter}
                        value={searchArchiveController.filter}
                        showSettings={setDateFilterVisibility}
                        dateStart={searchArchiveController.GetDatetimeStart()}
                        dateEnd={searchArchiveController.GetDatetimeEnd()}
                    />
                    <Button
                        OnClick={() => {
                            setQuestionVisible(true);
                        }}
                        className={styles.button}
                    >
                        Вернуть из архива
                    </Button>
                </div>

                <ListSearchArchive
                    data={searchArchiveController.GetArchiveData()}
                    sortingByCategory={searchArchiveController.GetSortingByCategory()}
                    sortingByName={searchArchiveController.GetSortingByName()}
                    sortingByDate={searchArchiveController.GetSortingByDate()}
                    SetSortingByCategory={searchArchiveController.SetSortingByCategory}
                    SetSortingByName={searchArchiveController.SetSortingByName}
                    SetSortingByDate={searchArchiveController.SetSortingByDate}
                />
            </div>
            {questionVisible && (
                <Question
                    OnClickAccept={() => { removeFromArchive()}}
                    OnClickDismiss={() => { setQuestionVisible(false); }}
                >
                    Вы уверены, что хотите <b>вернуть отмеченное из архива</b>?
                </Question>
            )}
            <DateFilter
                className={styles.datefilter}
                isVisible={dateFilterVisibility}
                setVisible={setDateFilterVisibility}
                setDatetime={searchArchiveController.ChangeDatetimeFilter}
            />
        </div>
    );
}

export default Archive;
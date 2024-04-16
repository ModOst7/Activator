"use client";
import React, { useEffect, useState } from "react";
import styles from "./usersStyle.module.css";
import InputSearch from "@/components/inputSearch/InputSearch";
import Button from "@/components/buttons/button/Button";
import AddUserIcon from "@/components/icons/AddUserIcon";
import useSearch from "@/components/search/SearchTrainingController";
import Question from "@/components/question/Question";
import ListSearchUsers from "@/components/users/listSearchUsers/ListSearchUsers"
import UsersManageView from "@/components/users/usersManage/UsersManageView";

import useSearchUsers from "@/components/users/SearchUsersController";
import useUsersManage from "@/components/users/usersManage/UsersManageController";
import { operations } from "@/components/users/usersManage/UsersManageModel";

import DateFilter from "@/components/datefilter/DateFilter";


function Search() {
    const searchUsersController = useSearchUsers();
    const usersManageController = useUsersManage();

    const [dateFilterVisibility, setDateFilterVisibility] = useState(false);

    const archiveProfile = () => {
        if (usersManageController.user) {
            usersManageController.ArchiveUser(usersManageController.user).then(() => {
                searchUsersController.RefreshData();
            });
            usersManageController.CloseQuestions();
        }
    }

    useEffect(() => { 
        searchUsersController.ChangeDatetimeFilter(undefined, undefined);
    }, []);
    return (
        <div className={styles.root}>
            <div className={styles.text}>Пользователи</div>
            <div className={styles.wrapper}>
                <div className={styles.search_panel}>
                    <InputSearch
                        className={styles.search_input}
                        placeholder="Поиск"
                        SetValue={searchUsersController.SetFilter}
                        value={searchUsersController.filter}
                        showSettings={setDateFilterVisibility}
                        dateStart={searchUsersController.GetDatetimeStart()}
                        dateEnd={searchUsersController.GetDatetimeEnd()}
                    />
                    <Button
                        OnClick={() => {
                            usersManageController.OpenUsersManager(operations.add);
                        }}
                        className={styles.button}
                    >
                        <AddUserIcon className={styles.add_icon} />Добавить пользователя
                    </Button>
                </div>

                <ListSearchUsers
                    data={searchUsersController.GetUsersData()}
                    sortingByName={searchUsersController.GetSortingByName()}
                    sortingByDate={searchUsersController.GetSortingByDate()}
                    SetSortingByName={searchUsersController.SetSortingByName}
                    SetSortingByDate={searchUsersController.SetSortingByDate}
                />
            </div>
            <UsersManageView
                visible={usersManageController.GetVisible()}
                operationStatus={usersManageController.GetOperationStatus()}
                setVisible={usersManageController.SetVisible}
                getUser={usersManageController.GetUser}
                user={usersManageController.GetUser()}
                RefreshData={searchUsersController.RefreshData}
            />
            {usersManageController.GetQuestionVisible() && (
                <Question
                    OnClickAccept={() => { archiveProfile(); }}
                    OnClickDismiss={() => { usersManageController.CloseQuestions() }}
                >
                    <b>Вы уверены, что хотите <br />переместить профиль в архив?</b>
                </Question>
            )}
            <DateFilter
                className={styles.datefilter}
                isVisible={dateFilterVisibility}
                setVisible={setDateFilterVisibility}
                setDatetime={searchUsersController.ChangeDatetimeFilter}
            />
        </div>
    );
}

export default Search;
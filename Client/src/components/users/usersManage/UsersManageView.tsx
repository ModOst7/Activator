import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./usersManage.module.css";
import Image from "next/image";
import Input from "@/components/input/Input";
import Eye from "@/components/icons/Eye";
import LockIcon from "@/components/icons/LockIcon";
import InputData from "@/components/input/inputData";
import Options from "@/components/options/Options";
import Button from "@/components/buttons/button/Button";
import { TypeErrorInput } from "@/components/input/Input";
import closeIcon from "@/icons/close_manager.svg";
import { operations, setUser, setVisible } from "./UsersManageModel";
import { ISearchUserElement } from "../SearchUsersModel";
import { IUser } from "@/redux/features/rootSlice";
import useUsersManage from "./UsersManageController";
import { TypeRights } from "../SearchUsersModel";
import { useRouter } from "next/navigation";

function UsersManageView(props: {
    visible: boolean;
    operationStatus: operations;
    setVisible(value: boolean): void;
    user: IUser | undefined;
    getUser(): IUser | undefined;
    RefreshData(): void;
}) {
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [userRights, setUserRights] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(TypeErrorInput.none);
    const [disableButton, setDisableButton] = useState(false);
    const [passwordVisible, SetPasswordVisible] = useState(false);

    const [errorFullname, setErrorFullname] = useState(TypeErrorInput.none);
    const [errorUserRights, setErrorUserRights] = useState(TypeErrorInput.none);
    const [errorLogin, setErrorLogin] = useState(TypeErrorInput.none);
    const [errorPassword, setErrorPassword] = useState(TypeErrorInput.none);

    const addUser = <span><b>Добавление</b> профиля пользователя</span>;
    const editUser = <span><b>Редактирование</b> профиля пользователя</span>;

    const usersManageController = useUsersManage();

    const refreshWindow = () => {
        setFullname("");
        setLogin("");
        setPassword("");
        setUserRights("Пользователь");
        setErrorLogin(TypeErrorInput.none);
        setErrorFullname(TypeErrorInput.none);
        setErrorPassword(TypeErrorInput.none);
        setErrorUserRights(TypeErrorInput.none);
        setError(TypeErrorInput.none);
    }

    const AddUser = () => {
        usersManageController.AddUser(fullname, (userRights == "Администратор") ? TypeRights.administrator : TypeRights.user, login, password).then(function (response) {
            if (response.isCreated) {
                props.RefreshData();
                props.setVisible(false);
                refreshWindow();
            } else
                setErrorLogin(TypeErrorInput.wrongData)
            setDisableButton(false);
        });
    }

    const EditUser = () => {
        if (props.user)
            usersManageController.EditUser(props.user.id, fullname, (userRights == "Администратор") ? TypeRights.administrator : TypeRights.user, login, password).then(function (response) {
                if (response.isEdit) {
                    props.RefreshData();
                    props.setVisible(false);
                    refreshWindow();
                } else
                    setErrorLogin(TypeErrorInput.wrongData)
                setDisableButton(false);
            })
    }

    const Process = useCallback(() => {
        setDisableButton(true);
        if (fullname.trim() == "") {
            setErrorFullname(TypeErrorInput.emptyData);
        }
        if (userRights == "") {
            console.log(userRights)
            setErrorUserRights(TypeErrorInput.emptyData);
        }
        if (login.trim() == "") {
            setErrorLogin(TypeErrorInput.emptyData);
        }
        if (password.trim() == "") {
            setErrorPassword(TypeErrorInput.emptyData);
        }

        if (password.trim() == "" || login.trim() == "" || fullname.trim() == "" || userRights == "") {
            setError(TypeErrorInput.emptyData);
            setDisableButton(false);
        } else {
            switch (props.operationStatus) {
                case operations.add:
                    AddUser();
                    break;
                case operations.edit:
                    EditUser();
                    break;
                default:
                    break;
            }
        }
    }, [login, password, userRights, fullname]);

    useEffect(() => {
        if (props.operationStatus == operations.edit && props.user) {
            setFullname(props.user.name);
            setLogin(props.user.login);
            setPassword(props.user.password);
            if (props.user.type == TypeRights.administrator) {
                setUserRights("Администратор");
            } else {
                setUserRights("Пользователь");
            }
        } else {
            setFullname("");
            setLogin("");
            setPassword("");
            setUserRights("");
        }
    }, [props.user, props.visible]);

    const messageClass = useMemo(() => {
        if (error == TypeErrorInput.emptyData) {
            return styles.message_empty_data;
        } else if (error == TypeErrorInput.wrongData) {
            return styles.message_wrong_data;
        }
        return "";
    }, [error]);

    return (
        <>
            <div className={[styles.bg_screen, props.visible ? styles.opened : styles.closed].join(" ")}>
                <div className={styles.manage_window}>
                    <div className={styles.manage_window_title}>{props.operationStatus == operations.add ? addUser : editUser}</div>
                    <div className={styles.manage_window_options}>
                        <div className={styles.option_one}>
                            <div className={styles.option_title}>Ф.И.О.</div>
                            <div>
                                <InputData
                                    data={fullname}
                                    className={styles.input}
                                    placeholder="Введите Ф.И.О."
                                    error={errorFullname}
                                    OnChange={(data: string) => {
                                        setFullname(data);
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.option_two}>
                            <div className={styles.option_title}>Тип прав учетной записи</div>
                            <div>
                                <Options
                                    options={["Администратор", "Пользователь"]}
                                    currentOption={userRights}
                                    setOption={setUserRights}
                                    error={errorUserRights}
                                />
                            </div>
                        </div>
                        <div className={styles.option_three}>
                            <div className={styles.option_title}>Логин</div>
                            <div>
                                <InputData
                                    data={login}
                                    className={styles.input}
                                    placeholder="Введите логин"
                                    OnChange={(data: string) => {
                                        setLogin(data);
                                    }}
                                    error={errorLogin}
                                />
                            </div>
                        </div>
                        <div className={styles.option_four}>
                            <div className={styles.option_title}>Пароль</div>
                            <div>
                                <InputData
                                    icon={<Eye isOpen={passwordVisible} />}
                                    type={passwordVisible ? "text" : "password"}
                                    OnClickIcon={() => SetPasswordVisible(!passwordVisible)}
                                    data={password}
                                    className={styles.input}
                                    placeholder="Введите пароль"
                                    OnChange={(data: string) => {
                                        setPassword(data);
                                    }}
                                    error={errorPassword}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={[styles.message, messageClass].join(" ")}>
                        {error == TypeErrorInput.emptyData && "Введите необходимые данные"}
                        {error == TypeErrorInput.wrongData &&
                            "Введены неверные данные. Попробуйте еще раз"}
                        {errorLogin == TypeErrorInput.wrongData && "Логин уже существует"}
                    </div>
                    <Button
                        className={styles.manage_window_button}
                        disabled={disableButton}
                        OnClick={Process}
                    >
                        Сохранить
                    </Button>
                </div>
                <div
                    className={styles.close_window}
                    onClick={() => {
                        props.setVisible(false);
                        refreshWindow();
                    }
                    }
                >
                    <Image width={60} height={60} src={closeIcon} alt={""} />
                </div>
            </div>
        </>
    )
}

export default UsersManageView;
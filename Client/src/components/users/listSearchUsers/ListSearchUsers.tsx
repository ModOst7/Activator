import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import styles from "./listUsers.module.css";
import CloseIcon from "@/components/icons/CloseIcon";
import SearchUserView from "@/components/users/SearchUserView";
import { ISearchUserElement, setSortingByName } from "@/components/users/SearchUsersModel";
import { IUser } from "@/redux/features/rootSlice";


interface IUsersData {
    data: IUser[],
    isError: boolean,
}

function ListSearchUsers(props: {
    data: IUser[] | boolean;
    /*data(): IUser[];*/
    sortingByName: boolean | undefined;
    sortingByDate: boolean | undefined;
    SetSortingByName(value: boolean | undefined): void;
    SetSortingByDate(value: boolean | undefined): void;
}) {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>()
    useEffect(() => {
        if (typeof props.data == "boolean") {
            router.push("/search");
            return;
        } else {
            setUsers(props.data)
        }

        console.log(users);
    }, [props.data])

    return (
        <>
            <div className={styles.users_list}>
                <table>
                    <thead className={styles.thead}>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>
                                <div className={styles.fio}>
                                    <div>Ф.И.О.</div>
                                    <div className={styles.sort_block}>
                                        {<CloseIcon className={[styles.cancel_sort, props.sortingByName === undefined ? styles.invisible : ""].join(" ")} onClick={() => { props.SetSortingByName(undefined); }} />}
                                        <div
                                            className={styles.arrows_block}
                                            onClick={() => {
                                                props.SetSortingByName(!props.sortingByName);
                                            }}
                                        >
                                            <div
                                                className={styles.triangle + " " + ((props.sortingByName === true) ? styles.arrow_up : (props.sortingByName === false) ? styles.arrow_down : "")}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th /*onClick={() => {
                                props.SetSortingByDate(!props.sortingByDate);
                            }}*/
                            >
                                <div className={styles.date}>
                                    <div>Дата добавления</div>
                                    <div className={styles.sort_block}>
                                        {<CloseIcon className={[styles.cancel_sort, props.sortingByDate === undefined ? styles.invisible : ""].join(" ")} onClick={() => { props.SetSortingByDate(undefined); }} />}
                                        <div
                                            className={styles.arrows_block}
                                            onClick={() => {
                                                props.SetSortingByDate(!props.sortingByDate);
                                            }}
                                        >
                                            <div
                                                className={styles.triangle + " " + ((props.sortingByDate === true) ? styles.arrow_up : (props.sortingByDate === false) ? styles.arrow_down : "")}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>Логин</th>
                            <th>Пароль</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((item, i) => (
                            <SearchUserView data={item} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListSearchUsers;
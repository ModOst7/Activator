import React from "react";
import styles from "./searchArchive.module.css";

import { ISearchArchiveElement } from "./SearchArchiveModel";
import Checkbox from "../checkbox/Checkbox";
import useSearchArchive from "./SearchArchiveController";

function SearchArchiveView(props: { data: ISearchArchiveElement }) {
    const { data } = props;
    const searchArchiveController = useSearchArchive();
    return (
        <>
            <tr className={styles.row}>
                <td><div className={styles.inner}>{<Checkbox checked={Boolean(data.isChecked)} onClick={() => {searchArchiveController.CheckData(String(data.id))}} />}</div></td>
                <td><div className={styles.inner}>{data.category == "user" ? "Пользователь" : "Тренажер"}</div></td>
                <td><div className={styles.inner}>{data.name}</div></td>
                <td><div className={[styles.inner, styles.date].join(" ")}>{data.date.toLocaleString('ru-RU', { timeZone: 'UTC' })}</div>
                </td>
            </tr>
        </>
    )
}

export default SearchArchiveView;

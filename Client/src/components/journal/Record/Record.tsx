import React from "react";
import styles from "./record.module.css";
import AdminIcon from "@/components/icons/AdminIcon";
import Label from "@/components/other/label/Label";
import EditUserIcon from "@/components/icons/EditUserIcon";
import ArchiveUserIcon from "@/components/icons/ArchiveUserIcon";
import Image from "next/image";

import okIcon from "@/icons/ok.svg";
import errIcon from "@/icons/err.svg";

import { IJournalRecord } from "../JournalModel";

function Record(props: { 
    data: IJournalRecord,
    setActiveRecord(record: IJournalRecord) : void, 
}) {
    const { data } = props;
    const options = {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    return (
        <>
            <tr className={styles.row} onClick={() => {props.setActiveRecord(props.data)}}>
                <td><div className={[styles.inner, styles.icon].join(" ")}>{data.isSuccess ? <Image src={okIcon} alt="успешно" /> : <Image src={errIcon} alt="неуспешно" />}</div></td>
                <td><div className={[styles.inner, styles.date].join(" ")}>{data.date.toLocaleString('ru-RU', { timeZone: 'Europe/Samara' })}</div></td>
                <td><div className={[styles.inner, styles.action].join(" ")}>{data.action}</div></td>
                <td><div className={[styles.inner, styles.username].join(" ")}>{data.username}</div></td>
                <td className={styles.td_productname}><div className={[styles.inner, styles.productname].join(" ")}><div>{data.productname}</div><div className={styles.vendor}>{data.vendorCode}</div></div></td>
            </tr>
        </>
    )
}

export default Record;
import styles from "./listRecords.module.css";
import SearchUserView from "@/components/users/SearchUserView";
import { IJournalRecord } from "../JournalModel";
import Record from "../Record/Record";


function ListRecords(props: {
    data?: IJournalRecord[];
    setActiveRecord(record: IJournalRecord): void;
}) {
    return (
        <>
            <div className={styles.records_list}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.records_header}>
                            <th></th>
                            <th>
                                <div className={styles.datetime}>
                                    <div>Дата и время</div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.action}>
                                    <div>Действие</div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.username}>
                                    <div>Пользователь</div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.productname}>
                                    <div>Название тренажера</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.map((item, i) => (
                            <Record
                                data={item}
                                key={i}
                                setActiveRecord={props.setActiveRecord}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListRecords;
import styles from "./listArchive.module.css";
import SearchArchiveView from "@/components/archive/SearchArchiveView";
import { ISearchArchiveElement, setSortingByName } from "@/components/archive/SearchArchiveModel";
import CloseIcon from "@/components/icons/CloseIcon";


function ListSearchArchive(props: {
    data?: ISearchArchiveElement[];
    sortingByCategory: boolean | undefined;
    sortingByName: boolean;
    sortingByDate: boolean;
    SetSortingByCategory(value: boolean | undefined): void;
    SetSortingByName(value: boolean): void;
    SetSortingByDate(value: boolean): void;
}) {
    return (
        <>
            <div className={styles.users_list}>
                <table>
                    <thead className={styles.thead}>
                        <tr>
                            <th></th>
                            <th /*onClick={() => {
                                props.SetSortingByCategory(!props.sortingByCategory);
                            }}*/
                            >
                                <div className={styles.category}>
                                    <div>Категория</div>
                                    <div className={styles.sort_block}>
                                        {<CloseIcon className={[styles.cancel_sort, props.sortingByCategory === undefined ? styles.invisible : ""].join(" ")} onClick={() => { props.SetSortingByCategory(undefined); }} />}
                                        <div
                                            className={styles.arrows_block}
                                            onClick={() => {
                                                props.SetSortingByCategory(!props.sortingByCategory);
                                            }}
                                        >
                                            <div
                                                className={styles.triangle + " " + ((props.sortingByCategory === true) ? styles.arrow_up : (props.sortingByCategory === false) ? styles.arrow_down : "")}>
                                            </div>
                                        </div>
                                    </div>

                                    {/*<div className={styles.triangle + " " + (props.sortingByCategory ? styles.arrow_up : styles.arrow_down)}></div>*/}
                                </div>
                            </th>
                            <th>
                                <div className={styles.name}>
                                    <div>Название/Ф.И.О.</div>

                                </div>
                            </th>
                            <th>Дата добавления</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.map((item, i) => (
                            <SearchArchiveView data={item} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListSearchArchive;
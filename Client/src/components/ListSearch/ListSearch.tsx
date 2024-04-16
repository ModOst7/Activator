import React from "react";
import SearchElement from "../searchElement/SearchElement";
import styles from "./listSearch.module.css";

import { ISearchElement } from "../search/SearchModel";



function ListSearch(props: {
  className?: string;
  data?: ISearchElement[];
  disabled?: boolean;
  value: string;
  setValue(val: string) : void;
  setDatetimes(start: Date | undefined, end: Date | undefined) : void;
}) {

  const notFound = <div className={styles.empty_result}>По запросу {props.value} ничего не найдено. Убедитесь, что все слова написаны правильно. <br />Вернуться <span className={styles.link} onClick={() => {props.setValue(""); props.setDatetimes(undefined, undefined)}}>к списку генераторов ключей</span>.</div>;

  return (
    <div
      className={[
        props.className,
        styles.root,
        props.disabled && styles.disabled,
      ].join(" ")}
    >
      {props.data?.map((item, i) => (
        <SearchElement data={item} key={i} disabled={props.disabled} />
      ))}
      {!props.data?.length && notFound}
    </div>
  );
}

export default ListSearch;

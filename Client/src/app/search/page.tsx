"use client";
import React, { useEffect, useState } from "react";
import styles from "./searchStyle.module.css";
import InputSearch from "@/components/inputSearch/InputSearch";
import ListSearch from "@/components/ListSearch/ListSearch";
import useSearch from "@/components/search/SearchTrainingController";
import HeaderController from "@/components/header/HeaderController";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setVisibleHistory } from "@/components/search/SearchModel";
import SearchHistory from "@/components/searchHistory/SearchHistory";
import DateFilter from "@/components/datefilter/DateFilter";

function Search() {
  const searchController = useSearch();
  const isVisibleHistory = searchController.GetVisibleHistory();

  const [dateFilterVisibility, setDateFilterVisibility] = useState(false);

  useEffect(() => {
    console.log(searchController.filter);
  }, [searchController.filter]);

  useEffect(() => { 
    searchController.ChangeDatetimeFilter(undefined, undefined);
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.text}>Поиск генераторов ключей</div>
      <div className={styles.wrapper}>
        <InputSearch
          className={styles.search_input}
          placeholder="Поиск"
          OnFocus={searchController.ShowHistory}
          OnBlur={searchController.HideHistory}
          SetValue={searchController.SetFilter}
          value={searchController.filter}
          showSettings={setDateFilterVisibility}
          dateStart={searchController.GetDatetimeStart()}
          dateEnd={searchController.GetDatetimeEnd()}
        />
        <div className={styles.overlay}>
          <SearchHistory
            visible={isVisibleHistory && searchController.history.length != 0}
            SetFliter={searchController.SetFilter}
            history={searchController.history}
          />
        </div>
        <ListSearch
          className={styles.list_results}
          data={searchController.GetTrainersData()}
          disabled={searchController.GetVisibleHistory()}
          value={searchController.filter}
          setValue={searchController.SetFilter}
          setDatetimes={searchController.ChangeDatetimeFilter}
        />
        <DateFilter
          isVisible={dateFilterVisibility}
          setVisible={setDateFilterVisibility}
          setDatetime={searchController.ChangeDatetimeFilter}
        />
      </div>
    </div>
  );
}

export default Search;

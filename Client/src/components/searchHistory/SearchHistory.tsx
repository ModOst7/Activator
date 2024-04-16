import React from "react";
import styles from "./history.module.css";
import useSearch from "../search/SearchTrainingController";

function SearchHistory(props: {
  visible: boolean;
  history: string[];
  SetFliter(value: string): void;
}) {
  return (
    <div
      className={[styles.root, props.visible ? styles.show : styles.hide].join(
        " "
      )}
    >
      Ваши недавние запросы:<> </>
      {props.history.map((item, i) => (
        <LinkHistory
          link={item}
          key={i}
          index={i}
          length={props.history.length}
          OnClick={() => {
            props.SetFliter(item);
          }}
        />
      ))}
    </div>
  );
}

const LinkHistory = (props: {
  link: string;
  index: number;
  length: number;
  OnClick: () => void;
}) => {
  if (props.index == props.length - 1) {
    return (
      <div onClick={props.OnClick} className={styles.linked_history}>
        {props.link}
      </div>
    );
  } else if (props.index >= 0) {
    return (
      <>
        <div onClick={props.OnClick} className={styles.linked_history}>
          {props.link}
        </div>
        <>, </>
      </>
    );
  }
};

export default SearchHistory;

import React, { ReactNode, useMemo } from "react";
import styles from "./styles.module.css";

export enum QuestionButtonType {
  Accept = 1,
  Dismiss = 2,
}

function ButtonQuestion(props: {
  children?: ReactNode;
  type: QuestionButtonType;
  onClick?: () => void;
}) {
  const style = useMemo(() => {
    if (props.type == QuestionButtonType.Accept) {
      return styles.accept;
    } else {
      return styles.dismiss;
    }
  }, [props.type]);
  return (
    <div onClick={props.onClick} className={[styles.root, style].join(" ")}>
      {props.children}
    </div>
  );
}

export default ButtonQuestion;

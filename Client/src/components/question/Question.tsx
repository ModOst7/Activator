import React, { ReactNode } from "react";
import styles from "./question.module.css";
import Background from "../other/background/Background";
import ButtonQuestion, {
  QuestionButtonType,
} from "../buttons/buttonQuestion/ButtonQuestion";
function Question(props: {
  children?: ReactNode;
  OnClickAccept?: () => void;
  OnClickDismiss?: () => void;
}) {
  return (
    <Background className={styles.background}>
      <div className={styles.root}>
        <div className={styles.text}>{props.children}</div>
        <div className={styles.buttons}>
          <ButtonQuestion
            onClick={props.OnClickAccept}
            type={QuestionButtonType.Accept}
          >
            Да
          </ButtonQuestion>
          <ButtonQuestion
            onClick={props.OnClickDismiss}
            type={QuestionButtonType.Dismiss}
          >
            Нет
          </ButtonQuestion>
        </div>
      </div>
    </Background>
  );
}

export default Question;

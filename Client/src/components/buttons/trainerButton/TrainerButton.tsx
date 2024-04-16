import React, { ReactNode, useMemo } from "react";
import styles from "./styles.module.css";

export enum QuestionButtonType {
    Accept = 1,
    Dismiss = 2,
}

function TrainerButton(props: {
    className?: string;
    children?: ReactNode;
    type?: QuestionButtonType;
    onClick?: () => void;
}) {
    
    
    return (
        <div className={[styles.border, props.className].join(" ")}>
            <div onClick={props.onClick} className={[styles.root].join(" ")}>
                {props.children}
            </div>
        </div>
    );
}

export default TrainerButton;

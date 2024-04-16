import React, { ReactNode } from "react";
import styles from "./style.module.css";

function Label(props: {
    className?: string;
    text?: string;
    icon?: ReactNode;
}) {
    return (
        <>
            <div className={styles.label_hover}>
                <div className={[props.className, styles.label].join(" ")}>
                    <div className={styles.text}>{props.text}</div>
                    <div className={styles.triangle}></div>
                </div>
                {props.icon}
            </div>
        </>
    );
}

export default Label;
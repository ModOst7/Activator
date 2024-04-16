import React, { ReactNode } from "react";
import styles from "./styles.module.css";

function Checkbox(props: {
    className?: string;
    checked: boolean;
    onClick: () => void;
}) {
    return (
        <div className={styles.container}>
            <div onClick={(e) => props.onClick()} className={styles.checkbox}>
                <div className={[styles.galka, props.checked ? styles.checked : ""].join(" ")}></div>
            </div>
        </div>
    );
}

export default Checkbox;
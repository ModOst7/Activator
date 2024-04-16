import React, { useState, useRef, useMemo, useEffect, useImperativeHandle } from "react";
import styles from "./styles.module.css";


function Timepicker(props: {
    time: string
    setTime(value: string): void;
}) {
    const timeRef = useRef<HTMLInputElement>(null);

    const onUp = () => {
        if (timeRef.current) {
            timeRef.current.stepUp();
            props.setTime(timeRef.current.value);
        }
    }

    const onDown = () => {
        if (timeRef.current) {
            timeRef.current.stepDown();
            props.setTime(timeRef.current.value);
        }
    }

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        props.setTime(e.currentTarget.value);
    }


    return (
        <>
            <div className={styles.timepicker_block}>
                <input className={styles.timepicker_input} type="time" step="1" ref={timeRef} value={props.time} onChange={handleTime} />
                <div className={styles.triangle_up} onClick={onUp}></div>
                <div className={styles.triangle_down} onClick={onDown}></div>
            </div>
        </>
    )
}

export default Timepicker;
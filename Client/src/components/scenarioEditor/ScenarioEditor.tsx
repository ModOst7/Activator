import React, { SetStateAction, Dispatch } from "react";
import styles from "./styles.module.css";

import Scenario, { IScenario } from "./scenario/Scenario";

import useAPI from "@/hooks/useAPI";

function ScenarioEditor(props: {
    scenarios: IScenario[],
    setScenarios: Dispatch<SetStateAction<IScenario[]>>
}) {

    const addScenario = () => {
        let newScenario = {
            id: props.scenarios.length,
            name: "",
            isVisible: true,
            /*isEnable: false,*/
        }
        const newState = [...props.scenarios];
        newState.push(newScenario);
        props.setScenarios(newState);
    }

    const empty = <div className={styles.empty}>
        <div className={styles.empty_text}>Нет сценариев</div>
    </div>

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.label}>Управление сценариями</div>
                    <div className={styles.add} onClick={() => addScenario()}>Добавить сценарий</div>
                </div>
                <div className={styles.delimeter}></div>
                <div className={styles.body}>
                {props.scenarios.length == 0 ? empty : props.scenarios.map((item, i) => (
                        <Scenario
                            key={i}
                            scenario={item}
                            scenarios={props.scenarios}
                            setScenarios={props.setScenarios}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ScenarioEditor;
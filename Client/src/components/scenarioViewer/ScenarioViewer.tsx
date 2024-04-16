import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./styles.module.css";

import Scenario, { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import Checkbox from "../checkbox/Checkbox";

import useAPI from "@/hooks/useAPI";

function ScenarioViewer(props: {
    scenarios: IScenario[],
    setScenarios: Dispatch<SetStateAction<IScenario[]>>
}) {

    const [allScenarios, setAllScenarios] = useState(false);

    const toggleScenario = (id: number) => {
        //const newState = [...props.scenarios];
        const newState = props.scenarios.map((item, i) => {
            if (id == item.id) {
                item.isEnable = !item.isEnable;
            }
            return item;
        })
        props.setScenarios(newState);
    }

    useEffect(() => {
        const newState = props.scenarios.map((item, i) => {
            item.isEnable = allScenarios;
            return item;
        })
        props.setScenarios(newState);
    }, [allScenarios])

    const empty = <div className={styles.empty}>
        <div className={styles.empty_text}>Нет сценариев</div>
    </div>

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.label}>Сценарии: <span className={styles.scenario_count}>{props.scenarios.length}</span></div>
                    <div className={styles.add}>
                        <div className={styles.add_text}>Выбрать все сценарии</div>
                        <Checkbox
                            checked={allScenarios}
                            onClick={() => { setAllScenarios(!allScenarios) }}
                        />
                    </div>
                </div>
                <div className={styles.delimeter}></div>
                <div className={styles.body}>
                    {props.scenarios.length == 0 ? empty : props.scenarios.map((item, i) => (
                        <div key={i} onClick={() => { toggleScenario(item.id) }}>
                            <div className={styles.scenario_delimeter}></div>
                            <div className={styles.scenario}>
                                <div>
                                    <Checkbox
                                        checked={item.isEnable != undefined ? item.isEnable : false}
                                        onClick={() => { }}
                                    />
                                </div>
                                <div className={styles.scenario_text}>
                                    <div>{item.name}</div>
                                </div>
                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default ScenarioViewer;
import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import styles from "./scenario.module.css";

import Eye from "@/components/icons/Eye";
import EditUserIcon from "@/components/icons/EditUserIcon";

export interface IScenario {
    id: number;
    name: string;
    isVisible: boolean;
    isEnable?: boolean;
}


function Scenario(props: {
    scenario: IScenario,
    scenarios: IScenario[],
    setScenarios: Dispatch<SetStateAction<IScenario[]>>
}) {

    const [scenario, setScenario] = useState(props.scenario);
    const [editable, setEditable] = useState(false);

    const inputReference = useRef<any>(null);

    const toggleVisible = () => {
        setScenario((scenario) => ({
            ...scenario,
            isVisible: !scenario.isVisible
        }))
    }

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScenario((scenario) => ({
            ...scenario,
            name: e.target.value
        }))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            setEditable(false);
        }
    }

    useEffect(() => {
        if (editable)
            inputReference.current.focus();
    }, [editable]);

    useEffect(() => {
        if (props.scenario.name == "")
            setEditable(true);
    }, [])

    useEffect(() => {
        const newState = props.scenarios.map((obj) => {
            if (scenario.id == obj.id) {
                return scenario;
            }
            return obj;
        });
        props.setScenarios(newState);
    },[scenario])

    return (
        <>
            <div className={[styles.wrapper, !scenario.isVisible ? styles.hidden : "", editable ? styles.editable : ""].join(" ")}>
                <div className={styles.id_block}>
                    <div>ID: </div>
                    <div>{scenario.id}</div>
                </div>
                <div className={styles.name_block}>
                    <input
                        ref={inputReference}
                        placeholder="Введите название сценария"
                        className={[styles.input_name].join(" ")}
                        onChange={changeName}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setEditable(false)}
                        disabled={!editable}
                        type="text"
                        value={scenario.name}
                    />
                </div>
                <div className={styles.icons_block}>
                    <div className={styles.edit} onClick={() => setEditable(true)}>
                        <EditUserIcon />
                    </div>
                    <div onClick={() => toggleVisible()}>
                        <Eye isOpen={scenario.isVisible} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scenario;
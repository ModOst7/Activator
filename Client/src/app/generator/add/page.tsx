"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import basicStyles from "../generator.module.css";
import styles from "./addGenerator.module.css";
import TrainerButton from "@/components/buttons/trainerButton/TrainerButton";
import InputData from "@/components/input/Input";
import Image from "next/image";
import ScenarioEditor from "@/components/scenarioEditor/ScenarioEditor";
import { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import TagEditor from "@/components/tagEditor/TagEditor";
import { ITag } from "@/components/tagEditor/tag/Tag";

import { TypeErrorInput } from "@/components/input/inputData";
import useAPI from "@/hooks/useAPI";

function AddTrainer() {
    const api = useAPI();
    const user = useAppSelector((state) => state.rootReducer.user);
    const [appId, setAppId] = useState("");
    const [vendorCode, setVendorCode] = useState("");
    const [trainerName, setTrainerName] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const [errorVendor, setErrorVendor] = useState(TypeErrorInput.none);
    const [errorTrainerName, setErrorTrainerName] = useState(TypeErrorInput.none);

    const router = useRouter();

    useEffect(() => {
        //setErrorVendor(TypeErrorInput.none);
    }, [appId]);

    useEffect(() => {
        setErrorTrainerName(TypeErrorInput.none);
    }, [trainerName]);

    useEffect(() => {
        api.GenerateAppId().then((response) => {
            console.log(response.data);
            setAppId(response.data);
        })
    }, []);

    const [scenarios, setScenarios] = useState<IScenario[]>([]);

    const [tags, setTags] = useState<ITag[]>([])

    function addTrainer() {
        if (user == undefined) return;

        if (vendorCode.trim() == "") {
            setErrorVendor(TypeErrorInput.emptyData);
            console.log("asd")
            return;
        }
        if (trainerName.trim() == "") {
            setErrorTrainerName(TypeErrorInput.emptyData);
            return;
        }
        setIsDisabled(true);
        api.AddTrainer(appId, vendorCode, user.id, trainerName, scenarios, tags).then((response) => {
            console.log(response.data);
            if (response.data.isComplate) {
                router.push("/search")
            } else {
                console.log("Ошибка при добавлении")
            }
            setIsDisabled(false);
        });

    }

    const handleTrainerName = (data: string) => {
        setTrainerName(data);
        setErrorTrainerName(TypeErrorInput.none)
    }


    return (
        <div className={basicStyles.root}>
            <div className={basicStyles.text}>Создание генератора ключей</div>
            <div className={basicStyles.wrapper}>
                <div className={basicStyles.block_header}>
                    <div className={styles.trainer_id_block}>
                        <div className={styles.label}>ID тренажера</div>
                        <div className={styles.trainer_id}>{appId} </div>
                    </div>
                    <div className={styles.trainer_vendor_block}>
                        <div className={styles.label}>Артикул</div>
                        <InputData
                            data={vendorCode}
                            className={styles.input_name}
                            placeholder="Введите артикул"
                            error={errorVendor}
                            OnChange={(data: string) => {
                                setVendorCode(data);
                            }}
                        />
                    </div>
                    <div className={styles.trainer_name_block}>
                        <div className={styles.label}>Название тренажера</div>
                        <div className={styles.trainer_name}>
                            <InputData
                                data={trainerName}
                                className={styles.input_name}
                                placeholder="Введите название"
                                error={errorTrainerName}
                                OnChange={(data: string) => {
                                    setTrainerName(data);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.buttons_block}>
                        <TrainerButton

                            className={[styles.create_button, isDisabled ? styles.disabled : ""].join(" ")}
                            onClick={() => { addTrainer() }}
                        >
                            <div>Создать</div>
                        </TrainerButton>
                    </div>
                </div>
                <div className={basicStyles.block_body}>
                    <div className={basicStyles.block_one}>
                        <ScenarioEditor
                            scenarios={scenarios}
                            setScenarios={setScenarios}
                        />
                    </div>
                    <div className={basicStyles.block_two}>
                        <TagEditor
                            tags={tags}
                            setTags={setTags}
                        />
                    </div>
                    <div className={[styles.buttons_block, styles.mobile].join(" ")}>
                        <TrainerButton

                            className={[styles.create_button, isDisabled ? styles.disabled : ""].join(" ")}
                            onClick={() => { addTrainer() }}
                        >
                            <div>Создать</div>
                        </TrainerButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTrainer;
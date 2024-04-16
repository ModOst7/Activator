"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import basicStyles from "../../generator.module.css";
import styles from "./editGenerator.module.css";
import TrainerButton from "@/components/buttons/trainerButton/TrainerButton";
import InputData from "@/components/input/inputData";
import ScenarioEditor from "@/components/scenarioEditor/ScenarioEditor";
import { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import TagEditor from "@/components/tagEditor/TagEditor";
import { ITag } from "@/components/tagEditor/tag/Tag";
import Question from "@/components/question/Question";

import { TypeErrorInput } from "@/components/input/inputData";
import useAPI from "@/hooks/useAPI";
import Image from "next/image";
import ArchiveUserIcon from "@/components/icons/ArchiveUserIcon";

function Edit({ params }: { params: { id: string } }) {
    const api = useAPI();
    const [question, setQuestion] = useState(false);
    const [id, setId] = useState<number>(-1);
    const [appId, setAppId] = useState("");
    const [name, setName] = useState("");
    const user = useAppSelector((state) => state.rootReducer.user);
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();
    const [vendorCode, setVendorCode] = useState("");

    const [scenarios, setScenarios] = useState<IScenario[]>([]);
    const [tags, setTags] = useState<ITag[]>([])

    const [errorVendor, setErrorVendor] = useState(TypeErrorInput.none);
    const [errorTrainerName, setErrorTrainerName] = useState(TypeErrorInput.none);

    useEffect(() => {
        api.GetTrainer(params.id).then((data): void => {
            if (data != null) {
                console.log(data.scenarios)
                setScenarios(data.scenarios);
                setTags(data.tags);
                setId(data.id);
                setAppId(data.app_id);
                setName(data.name);
                setVendorCode(data.vendor_code);
                console.log(data);
            }
        })
    }, []);

    function editTrainer() {
        if (user == undefined) return;
        if (vendorCode.trim() == "") {
            setErrorVendor(TypeErrorInput.emptyData);
            console.log("asd")
            return;
        }
        if (name.trim() == "") {
            setErrorTrainerName(TypeErrorInput.emptyData);
            return;
        }
        setIsDisabled(true);
        api.EditTrainer(id, vendorCode, appId, name, scenarios, tags).then((response) => {
            console.log(response.data);
            if (response.data.isComplate) {
                router.push("/search");
            } else {
                console.log("Ошибка при добавлении")
            }
            setIsDisabled(false);
        });

    }


    return (
        <div className={basicStyles.root}>
            <div className={basicStyles.text}>Редактирование генератора ключей</div>
            <div className={basicStyles.wrapper}>
                <div className={basicStyles.block_header}>
                    <div className={styles.trainer_id_block}>
                        <div className={styles.label}>ID тренажера</div>
                        <div className={styles.trainer_id}>{appId}</div>
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
                                data={name}
                                className={styles.input_name}
                                placeholder="Введите название"
                                error={errorTrainerName}
                                OnChange={(data: string) => {
                                    setName(data);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.buttons_block}>
                        <TrainerButton
                            className={[styles.create_button, isDisabled ? styles.disabled : ""].join(" ")}
                            onClick={() => {editTrainer()}}
                        >
                            <div>Сохранить</div>
                        </TrainerButton>
                        <TrainerButton
                            className={styles.archive_button}
                            onClick={() => { setQuestion(true) }}
                        >
                            <ArchiveUserIcon />
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
                </div>
            </div>
            {question && (
                <Question
                    OnClickAccept={() => { }}
                    OnClickDismiss={() => { setQuestion(false) }}
                >
                    <b>Вы уверены, что хотите <br />переместить генератор ключей в архив?</b>
                </Question>
            )}
        </div>
    );
}

export default Edit;
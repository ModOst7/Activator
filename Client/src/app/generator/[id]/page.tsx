"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import basicStyles from "../generator.module.css";
import styles from "./styles.module.css";
import TrainerButton from "@/components/buttons/trainerButton/TrainerButton";
import InputData from "@/components/input/inputData";
import InputCode from "@/components/inputCode/InputCode";
import { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import { ITag } from "@/components/tagEditor/tag/Tag";
import Question from "@/components/question/Question";

import { TypeErrorInput } from "@/components/input/inputData";
import useAPI from "@/hooks/useAPI";
import ArchiveUserIcon from "@/components/icons/ArchiveUserIcon";
import EditUserIcon from "@/components/icons/EditUserIcon";

import ScenarioViewer from "@/components/scenarioViewer/ScenarioViewer";
import Options from "@/components/options/Options";
import Label from "@/components/other/label/Label";
import ErrorIcon from "@/components/icons/ErrorIcon";
import OkIcon from "@/components/icons/OkIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import PasteIcon from "@/components/icons/PasteIcon";

import { StatusCode } from "@/components/inputCode/InputCode";


function Edit({ params }: { params: { id: string } }) {
    const router = useRouter();
    const api = useAPI();
    const [question, setQuestion] = useState(false);
    const [id, setId] = useState("");
    const [vendorCode, setVendorCode] = useState("");
    const [appId, setAppId] = useState("");
    const [name, setName] = useState("");

    const [licenseType, setLicenseType] = useState("Бессрочная");
    const [dayCount, setDayCount] = useState(0);

    const [scenarios, setScenarios] = useState<IScenario[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);

    const [clientCode, setClientCode] = useState("");
    const [statusCode, setStatusCode] = useState<StatusCode>(StatusCode.none);
    const [generatedCode, setGeneratedCode] = useState("");

    const [iconVisible, setIconVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const pasteFromClipboard = () => {
        navigator.clipboard
            .readText()
            .then((clipText) => setClientCode(clipText));
    }

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(generatedCode)
            .then((clipText) => console.log("Скопировано в буфер"));
    }

    const editTrainer = (id: string) => {
        router.push('/generator/' + params.id + '/edit');
    }

    const generateKey = () => {
        setIsDisabled(true);
        const activeScenarios = scenarios.filter((scenario: IScenario) => scenario.isEnable);
        const tempDayCount = licenseType == "Бессрочная" ? -1 : dayCount;
        api.GenerateKey(clientCode, appId, tempDayCount, name, activeScenarios).then((response) => {
            console.log(response.data);
            if (response.data.isComplate) {
                //router.push("/search");
                console.log("успешно сгенерирован ключ");
                setGeneratedCode(response.data.key);
            } else {
                setStatusCode(StatusCode.wrongKey);
                console.log("Ошибка при генерации")
            }
            setIsDisabled(false);
        })
    }

    const archiveTrainer = () => {
        api.AddToArchive(Number(params.id), name, "trainer").then((response) => {
            if (response.data.isComplate) {
                router.push('/search/');
            }
        })
    }


    const status = [
        <Label icon={<ErrorIcon />} text={"Ошибка: неверный ключ"} className={styles.error_label} />,
        <OkIcon />,
        ""
    ]



    useEffect(() => {
        api.GetTrainer(params.id).then((data): void => {
            
            if (data != null) {
                data.scenarios = data.scenarios.filter((scenario: IScenario) => scenario.isVisible);
                console.log(data.scenarios)
                setScenarios(data.scenarios);
                setTags(data.tags);
                setId(data.id);
                setVendorCode(data.vendor_code);
                setAppId(data.app_id);
                setName(data.name);
            }
        })
    }, []);

    useEffect(() => {
        setStatusCode(StatusCode.none);
    },[clientCode])


    return (
        <div className={basicStyles.root}>
            <div className={basicStyles.text}>Генерация ключа</div>
            <div className={basicStyles.wrapper}>
                <div className={basicStyles.block_header}>
                    <div className={styles.trainer_id_block}>
                        <div className={styles.label}>Артикул</div>
                        <div className={styles.trainer_vendor}>{vendorCode}</div>
                    </div>
                    <div className={styles.trainer_name_block}>
                        <div className={styles.label}>Название тренажера</div>
                        <div className={styles.trainer_name}>
                            <InputData
                                data={name}
                                className={styles.input_name}
                                placeholder="Введите название тренажера"
                                error={TypeErrorInput.none}
                                OnChange={(data: string) => {
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.buttons_block}>
                        <TrainerButton
                            onClick={() => { editTrainer(params.id) }}
                            className={styles.edit_button}
                        >
                            <EditUserIcon />
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
                        <ScenarioViewer
                            scenarios={scenarios}
                            setScenarios={setScenarios}
                        />
                    </div>
                    <div className={[basicStyles.block_two, styles.credentials_block].join(" ")}>
                        <div className={styles.block_one}>
                            <div className={styles.license_type}>
                                <div className={styles.license_text}>Тип лицензии</div>
                                <div>
                                    <Options
                                        options={["Бессрочная", "Срочная"]}
                                        currentOption={licenseType}
                                        setOption={setLicenseType}
                                    />
                                </div>
                            </div>
                            <div className={styles.day_count}>
                                <div className={styles.license_text}>Количество дней</div>
                                <div>
                                    <InputData
                                        type="number"
                                        data={dayCount.toString()}
                                        className={[styles.input_name, licenseType == "Бессрочная" ? styles.disabled : ""].join(" ")}
                                        error={TypeErrorInput.none}
                                        OnChange={(data: string) => {
                                            setDayCount(Number(data));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.block_two}>
                            <div className={styles.code_text}>Код от клиента</div>
                            <div className={styles.code_block}>
                                <InputCode
                                    data={clientCode}
                                    className={[styles.input_client_code].join(" ")}
                                    status={statusCode}
                                    OnChange={(data: string) => {
                                        setClientCode(data);
                                    }}
                                    OnClickIcon={pasteFromClipboard}
                                    iconStatus={status[statusCode]}
                                    icon={<PasteIcon />}
                                />
                            </div>
                        </div>
                        <div className={styles.block_three}>
                            <TrainerButton
                                onClick={() => {generateKey();}}
                                className={[styles.generate_button, isDisabled ? styles.disabled : ""].join(" ")}
                            >
                                <div>Сгенерировать</div>
                            </TrainerButton>
                        </div>
                        <div className={styles.block_four}>
                            <div className={styles.generated_key}>Ключ активации для клиента</div>
                            <div>
                                <InputCode
                                    data={generatedCode}
                                    className={[styles.generated_code].join(" ")}
                                    OnChange={() => {
                                    }}
                                    OnClickIcon={copyToClipboard}
                                    icon={<CopyIcon />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={basicStyles.block_tags}><b>Теги: </b> <span className={styles.tags}>{tags.map((item) => item.name).join(", ")}</span></div>
                <div> </div>
            </div>
            {question && (
                <Question
                    OnClickAccept={() => { archiveTrainer()}}
                    OnClickDismiss={() => { setQuestion(false) }}
                >
                    <b>Вы действительно хотите переместить <br />генератор ключа в архив?</b>
                </Question>
            )}
        </div>
    );
}

export default Edit;
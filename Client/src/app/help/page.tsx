"use client";
import React, { useState } from "react";
import styles from "./helpStyles.module.css";

import useSearchArchive from "@/components/archive/SearchArchiveController";


function Archive() {
    return (
        <div className={styles.root}>
            <div className={styles.text}>Руководство пользователя</div>
            <div className={styles.wrapper}>
                <div>
                    <div>

                        <input className={styles.input} type="checkbox" name="detail-one" id={styles.detail_one} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_one}>Как добавить учетную запись?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem
                                    aliquid veniam quis temporibus repudiandae illo, nostrum, pariatur quae! At animi modi
                                    dignissimos corrupti placeat voluptatum!
                                </p>
                            </div>
                        </details>

                        <input className={styles.input} type="checkbox" name="detail-two" id={styles.detail_two} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_two}>Как редактировать учетную запись?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem
                                    aliquid veniam quis temporibus repudiandae illo, nostrum, pariatur quae! At animi modi
                                    dignissimos corrupti placeat voluptatum!
                                </p>
                            </div>
                        </details>

                        <input className={styles.input} type="checkbox" name="detail-three" id={styles.detail_three} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_three}>Как удалить учетную запись?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <p>
                                    Facilis ducimus iure officia quos possimus quaerat iusto, quas, laboriosam sapiente autem ab
                                    assumenda eligendi voluptatum nisi eius cumque, tempore reprehenderit optio placeat
                                    praesentium non sint repellendus consequuntur? Nihil, soluta.
                                </p>
                            </div>
                        </details>

                        <input className={styles.input} type="checkbox" name="detail-four" id={styles.detail_four} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_four}>Как посмотреть логи программы?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <p>
                                    Facilis ducimus iure officia quos possimus quaerat iusto, quas, laboriosam sapiente autem ab
                                    assumenda eligendi voluptatum nisi eius cumque, tempore reprehenderit optio placeat
                                    praesentium non sint repellendus consequuntur? Nihil, soluta.
                                </p>
                            </div>
                        </details>

                        <input className={styles.input} type="checkbox" name="detail-five" id={styles.detail_five} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_five}>Как добавить новый генератор ключей?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <p>
                                    Facilis ducimus iure officia quos possimus quaerat iusto, quas, laboriosam sapiente autem ab
                                    assumenda eligendi voluptatum nisi eius cumque, tempore reprehenderit optio placeat
                                    praesentium non sint repellendus consequuntur? Nihil, soluta.
                                </p>
                            </div>
                        </details>

                        <input className={styles.input} type="checkbox" name="detail-five" id={styles.detail_six} />
                        <details open className={styles.details}>
                            <summary className={styles.summary}>
                                <label className={styles.label} htmlFor={styles.detail_six}>Как выдать ключ?</label>
                            </summary>
                            <div className={styles.content}>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <p>
                                    Facilis ducimus iure officia quos possimus quaerat iusto, quas, laboriosam sapiente autem ab
                                    assumenda eligendi voluptatum nisi eius cumque, tempore reprehenderit optio placeat
                                    praesentium non sint repellendus consequuntur? Nihil, soluta.
                                </p>
                            </div>
                        </details>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Archive;
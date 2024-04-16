import React, { SetStateAction, Dispatch, useEffect } from "react";
import styles from "./styles.module.css";

import Tag, { ITag } from "./tag/Tag";

import useAPI from "@/hooks/useAPI";

function TagEditor(props: {
    tags: ITag[],
    setTags: Dispatch<SetStateAction<ITag[]>>
}) {

    const addTag = () => {
        const newTag = {
            id: Math.random().toString(),
            name: "",
        }
        const newState = [...props.tags];
        newState.push(newTag);
        props.setTags(newState);
    }
    useEffect(() => {
        console.log(props.tags)
    }, [props.tags]);

    const empty = <div className={styles.empty}>
        <div className={styles.empty_text}>Нет тегов</div>
    </div>
    
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.label}>Управление тегами</div>
                    <div className={styles.add} onClick={() => addTag()}>Добавить тег</div>
                </div>
                <div className={styles.delimeter}></div>
                <div className={styles.body}>
                    {props.tags.length == 0 ? empty : props.tags.map((item, i) => (
                        <Tag
                            key={item.id}
                            tag={item}
                            tags={props.tags}
                            setTags={props.setTags}
                        />
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default TagEditor;
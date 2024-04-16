import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import styles from "./tag.module.css";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditUserIcon from "@/components/icons/EditUserIcon";

export interface ITag {
    id: string;
    name: string;
}


function Tag(props: {
    tag: ITag,
    tags: ITag[],
    setTags: Dispatch<SetStateAction<ITag[]>>
}) {

    const [tag, setTag] = useState(props.tag);
    const [editable, setEditable] = useState(false);

    const inputReference = useRef<any>(null);

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag((tag) => ({
            ...tag,
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
        if (props.tag.name == "")
            setEditable(true);
    }, [])

    useEffect(() => {
        console.log(tag);
        const newState = props.tags.map((obj) => {
            if (tag.id == obj.id) {
                return tag;
            }
            return obj;
        });
        props.setTags(newState);
    },[tag])

    const deleteTag = () => {
        props.setTags((current => current.filter((obj) => obj.id != tag.id)))
    }

    return (
        <>
            <div className={[styles.wrapper, editable ? styles.editable : ""].join(" ")}>
                <div className={styles.name_block}>
                    <input
                        ref={inputReference}
                        placeholder="Введите название тега"
                        className={[styles.input_name].join(" ")}
                        onChange={changeName}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setEditable(false)}
                        disabled={!editable}
                        type="text"
                        value={tag.name}
                    />
                </div>
                <div className={styles.icons_block}>
                    <div className={styles.edit} onClick={() => setEditable(true)}>
                        <EditUserIcon />
                    </div>
                    <div onClick={deleteTag}>
                        <DeleteIcon />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tag;
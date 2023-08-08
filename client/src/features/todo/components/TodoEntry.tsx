import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { formSubmissionHandler, onChangeHandler } from "../services/todoEntryServices";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "../../../assets/styles/TodoEntry.module.css";

const TodoEntry = (props: any) => {
    const [content, setContent] = useState<string>(props.content);
    const [x, setx] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e: FormEvent<HTMLFormElement>) => formSubmissionHandler(e, props.todoListId, props.entryId, content)}>
                <input className={styles.input} type="text" onChange={(e: ChangeEvent) => onChangeHandler(e, setContent)} value={content} />
                {x && <AiFillCheckCircle onClick={() => setx(false)} className={styles.checkbox} />}
                {!x && <div onClick={() => setx(true)} className={styles.circle}></div>}
            </form>
            <button type="submit" style={{ visibility: "hidden" }}></button>
        </div>
    )
};

export default TodoEntry;
import { useRef } from "react";
import styles from "../../../assets/styles/Todo.module.css";

const Todo = () => {
    const inputRef = useRef(null);

    return (
        <div className={styles.container}>
            <input className={styles.input} ref={inputRef} type="text" />
        </div>
    )
};

export default Todo;
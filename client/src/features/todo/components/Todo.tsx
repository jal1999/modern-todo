import { useEffect, useRef, useState, ReactElement, ReactNode } from "react";
import { getCurrentTodoList } from "../services/todoService";
import { TodoList } from "../../todolist-list/services/listServices";
import { useParams } from "react-router-dom";
import styles from "../../../assets/styles/Todo.module.css";
import TodoEntry from "./TodoEntry";
import AddMore from "./AddMore";

const Todo = (props: any) => {
    const [updates, setUpdates] = useState<number>(0);
    const [todoList, setTodoList] = useState<ReactElement | undefined>(undefined);
    const { todoListId }: { todoListId: string } = useParams();
    const inputRef = useRef(null);

    useEffect(() => {
        const fun = async () => await getCurrentTodoList(todoListId, setTodoList);
        fun();
    }, [updates])

    return (
        <div className={styles.container}>
            {/* <input className={styles.input} ref={inputRef} type="text" /> */}
            <div className={styles.secondContainer}>
                <div className={styles.lists}>
                    {todoList && todoList}
                </div>
                <div className={styles.more}>
                    <AddMore className={styles.more} todoListId={todoListId} update={() => setUpdates((prevState: number) => prevState + 1)} />
                </div>
            </div>
        </div>
    )
};

export default Todo;
import { ReactElement, useState, useEffect } from "react";
import styles from "../../../assets/styles/List.module.css";
import { getAllTodoLists, TodoList } from "../services/listServices";
import { FaPlus } from "react-icons/fa6";
import globals from "../../../assets/styles/global.css"

const List = (props: any) => {
    const [todoLists, setTodoLists] = useState<Array<ReactElement>>([]);

    const renderTodoLists = async (): Promise<void> => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        if (!email || !token)
            return;
        const todos = await getAllTodoLists(email, token);
        console.log(todos);
        const newTodos = todos.map((list: TodoList) => {
            return (
                <div className={styles.todoList} key={Math.random().toString()}>
                    <h1 className={styles.todoListTitle}>{list.title}</h1>
                </div>
            )
        });
        setTodoLists(newTodos);
    };

    useEffect(() => {
        renderTodoLists();
    }, [])

    return (
        <div className={styles.container}>
            {todoLists}
            <div className={styles.todoList} key={Math.random().toString()}>
                <h1 className={styles.todoListTitle}><FaPlus /></h1>
            </div>
        </div>
    )
};

export default List;
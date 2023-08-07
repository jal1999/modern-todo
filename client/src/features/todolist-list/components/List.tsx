import { ReactElement, useState, useEffect } from "react";
import styles from "../../../assets/styles/List.module.css";
import { getAllTodoLists, TodoList } from "../services/listServices";
import { FaPlus } from "react-icons/fa6";
import globals from "../../../assets/styles/global.css"
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";

const List = (props: any) => {
    const [todoLists, setTodoLists] = useState<Array<ReactElement>>([]);
    const menuIsOpen: boolean = useSelector((state: any) => state.menuOpen);

    const renderTodoLists = async (): Promise<void> => {
        const email = "jlafarr99@gmail.com";
        if (!email)
            return;
        const todos = await getAllTodoLists(email);
        const newTodos = todos.map((list: any) => {
            return (
                <div className={`${styles.todoList} ${!menuIsOpen ? styles.normal : styles.modalOpen}`} key={Math.random().toString()}>
                    <Item todoListTitle={list.title} />
                </div>
            )
        });
        newTodos.unshift(<div className={`${styles.todoList} ${!menuIsOpen ? styles.normal : styles.modalOpen}`} key={Math.random().toString()}>
            <h1 className={`${styles.todoListTitle}}`}><FaPlus /></h1>
        </div>)
        setTodoLists(newTodos);
    };

    useEffect(() => {
        renderTodoLists();
    }, [menuIsOpen])

    return (
        <div className={styles.container}>
            {todoLists}
        </div>
    )
};

export default List;
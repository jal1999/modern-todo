import { ReactElement, useState, useEffect } from "react";
import styles from "../../../assets/styles/List.module.css";
import { TodoList } from "../services/listServices";
import { createTodoList, getAllTodoLists } from "../../../services";
import { FaPlus } from "react-icons/fa6";
import globals from "../../../assets/styles/global.css"
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { JsxElement } from "typescript";
import { todoListRedirect } from "../services/itemServices";

const List = (props: any) => {
    const [todoLists, setTodoLists] = useState<Array<ReactElement>>([]);
    const [lists, setList] = useState<Array<TodoList>>([]);
    const menuIsOpen: boolean = useSelector((state: any) => state.menuOpen);

    const renderTodoLists = async (): Promise<void> => {
        const email = "jlafarr99@gmail.com";
        if (!email)
            return;
        const lists = await getAllTodoLists();
        if (!lists)
            return;
        const newTodos: Array<ReactElement> = lists.map((list: TodoList) => {
            console.log(list);
            return (
                <div className={`${styles.todoList} ${!menuIsOpen ? styles.normal : styles.modalOpen}`} key={Math.random().toString()} onClick={() => todoListRedirect(list._id)}>
                    <Item todoListTitle={list.title} todoListId={list._id} />
                </div>
            )
        });
        newTodos.unshift(<div className={`${styles.todoList} ${!menuIsOpen ? styles.normal : styles.modalOpen}`} key={Math.random().toString()}>
            <h1 onClick={createTodoList} className={`${styles.todoListTitle}}`}><FaPlus /></h1>
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
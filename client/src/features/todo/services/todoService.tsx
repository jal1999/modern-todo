import { Dispatch, SetStateAction, ReactElement, ReactNode } from "react";
import { getTodoList } from "../../../services";
import { TodoList } from "../../todolist-list/services/listServices";
import styles from "../../../assets/styles/Todo.module.css"
import TodoEntry from "../components/TodoEntry";

export const getCurrentTodoList = async (todoListId: string, setTodoFunction: Dispatch<SetStateAction<ReactElement | undefined>>): Promise<void>  => {
    try {
        const todoList: TodoList | undefined = await getTodoList(todoListId);
        console.log("here is the todo list from the getCurrentTodoList function", todoList);
        if (!todoList)
            throw "There is not todo list";
        setTodoFunction(<div className={styles.todoList}>
            {todoList.content.map((t:any) => <TodoEntry todoListId={todoListId} entryId={t._id} key={t._id} content={t.content} />)}</div>)
    } catch (err: any) {
        console.log(err);
    }
};
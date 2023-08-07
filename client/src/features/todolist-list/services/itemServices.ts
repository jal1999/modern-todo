import { RouterChildContext } from "react-router-dom";

export const todoListRedirect = (todoListName: string, history: RouterChildContext["router"]["history"]): void => {
    history.push(`/todo-lists/${todoListName}`)
};
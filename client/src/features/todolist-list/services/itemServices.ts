import { RouterChildContext } from "react-router-dom";

export const todoListRedirect = (todoListName: string): void => { 
    window.location.href = `/todo-lists/${todoListName}`;
};
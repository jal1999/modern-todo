import { RouterChildContext } from "react-router-dom";

export const todoListRedirect = (todoListId: string): void => { 
    window.location.href = `/todo-lists/${todoListId}`;
};
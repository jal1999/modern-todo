import { SetStateAction, Dispatch } from "react";
import { getRequest, postRequest, patchRequest, deleteRequest, Response } from "../lib/axios";
import { TodoList } from "../features/todolist-list/services/listServices";

export const getAllTodoList = async (setTodoLists: Dispatch<SetStateAction<Array<TodoList>>>): Promise<void> => {
    try {
        const { body: { todoLists } }: { body: { todoLists: Array<TodoList> } } = await getRequest("http://localhost:8080/api/todos/get-todos");
        setTodoLists(todoLists);
    } catch (err: any) {
        // dispatch({ type: "logout" }); ???????
        console.log("getAllTodoList error:", err);
    }
}

export const createTodoList = async (): Promise<void> => {
    try {
        await postRequest("http://localhost:8080/api/todos/create-todo", {});
    } catch (err: any) {
        // dispatch({ type: "logout" }); ???????
        console.log(err);
    }
}

export const deleteTodoList = async (todoListId: string): Promise<void> => {
    try {
        const requestBody: Object = { todoListId: todoListId };
        await deleteRequest("http://localhost:8080/api/todos/delete-todo", requestBody);
    } catch (err: any) {
        // dispatch({ type: "logout" }); ???????
        console.log(err);
    }
}

export const addTodoEntry = async (todoListId: string): Promise<void> => {
    try {
        const requestBody: Object = { _id: todoListId };
        await postRequest("http://localhost:8080/api/todos/add-entry", requestBody);
    } catch (err: any) {
        // dispatch({ type: "logout" }); ???????
        console.log(err);
    }
}

export const editTodoEntry = async (todoListId: string, todoEntryId: string): Promise<void> => {
    try {
        const requestBody: object = { todoListId: todoListId, todoListEntryId: todoEntryId };
        await postRequest("http://localhost:8080/api/todos/edit-entry", requestBody);
    } catch (err: any) {
        console.log(err);
    }
}

export const deleteTodoEntry = async (todoListId: string, todoEntryId: string): Promise<void> => {
    try {
        const requestBody: Object = { todoListId: todoListId, todoListEntryId: todoEntryId };
        await deleteRequest("http://localhost:8080/api/todos/delete-entry", requestBody);
    } catch (err: any) {
        console.log(err);
    }
}
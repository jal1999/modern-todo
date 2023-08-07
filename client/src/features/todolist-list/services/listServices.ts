import { Response, getRequest, postRequest, deleteRequest, patchRequest } from "../../../lib/axios";

interface Entry {
    content: string;
    completed: boolean;
}

export interface TodoList {
    title: string;
    content: Array<Entry>;
    dateOfCreation: string;
}

export const getAllTodoLists = async (email: string, token: string): Promise<Array<TodoList>> => {
    const url: string = `http://localhost:8080/api/todos/get-todos?email=${email}`
    try {
        const { body: { todoLists } }: Response = await getRequest(url, token);
        return todoLists;
    } catch (err: any) {
        console.log(err);
        return [];
    }
};
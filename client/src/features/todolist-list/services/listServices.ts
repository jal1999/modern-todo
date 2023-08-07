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

export const getAllTodoLists = async (email: string): Promise<Array<any>> => {
    const url: string = `http://localhost:8080/api/todos/get-todos?email=${"jlafarr99@gmail.com"}`
    try {
        const { body: { todoLists } }: Response = await getRequest(url, "toke");
        return todoLists;
    } catch (err: any) {
        console.log("here is the error", err);
        return [];
    }
};
import { addTodoEntry } from "../../../services";

export const createTodoEntry = async (todoListId: string, updateFunction: Function): Promise<void> => {
    try {
        await addTodoEntry(todoListId);
        updateFunction();
    } catch (err: any) {
        console.log(err);
    }
};
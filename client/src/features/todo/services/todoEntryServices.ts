import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import { editTodoEntry } from "../../../services";

export const onChangeHandler = (e: ChangeEvent, setStateFunction: Dispatch<SetStateAction<string>>): void => {
    setStateFunction((e.target as HTMLInputElement).value);
};

export const formSubmissionHandler = async (e: FormEvent<HTMLFormElement>, todoListId: string, todoListEntryId: string, content: string): Promise<void> => {
    e.preventDefault();
    try {
        await editTodoEntry(todoListId, todoListEntryId, content);
    } catch (err: any) {
        console.log(err);
    }
};
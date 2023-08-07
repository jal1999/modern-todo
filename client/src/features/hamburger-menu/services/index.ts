import { Dispatch, SetStateAction } from "react";

export const burgerClickHandler = (stateSettingFunction: Dispatch<SetStateAction<boolean>>): void => {
    stateSettingFunction((prevState) => !prevState);
}
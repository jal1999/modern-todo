import { AnyAction, Dispatch } from "redux";

export const burgerClickHandler = (dispatchFunction: Dispatch<AnyAction>, currentMenuState: boolean): void => {
    const type = currentMenuState ? "menuClose" : "menuOpen";
    dispatchFunction({ type: type });
}
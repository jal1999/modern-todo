import { Action, StoreEnhancer, createStore } from "redux";

const authReducer = (state = { token: "", menuOpen: false, email: "", issuer: "" }, action: any): any => {
    if (action.type === "login")
        return { ...state, token: action.token, email: action.email, issuer: action.issuer }
    else if (action.type === "logout")
        return {  }
    else if (action.type === "menuOpen")
        return { ...state, menuOpen: true }
    else if (action.type === "menuClose")
        return { ...state, menuOpen: false }
    return state;
}

const store = createStore(authReducer);

export default store;
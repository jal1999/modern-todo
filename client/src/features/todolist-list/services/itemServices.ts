export const todoListRedirect = (todoListId: string): void => { 
    window.location.href = `/todo-lists/${todoListId}`;
    console.log("clicked");
};
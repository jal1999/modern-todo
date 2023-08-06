import { Router } from "express";
import { getAllTodoLists, createTodoList, deleteTodoList, addTodoEntry } from "../controllers/todoController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.get("/get-todos", isAuthenticated, getAllTodoLists);

router.post("/create-todo", isAuthenticated, createTodoList);

router.delete("/delete-todo", isAuthenticated, deleteTodoList);

router.post("/add-entry", isAuthenticated, addTodoEntry);

export default router;
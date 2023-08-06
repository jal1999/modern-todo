import { Router } from "express";
import { getAllTodoLists, createTodoList, deleteTodoList } from "../controllers/todoController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.get("/get-todos", isAuthenticated, getAllTodoLists);

router.post("/create-todo", isAuthenticated, createTodoList);

router.delete("/delete-todo", isAuthenticated, deleteTodoList);

export default router;
import express from 'express';
import { createTodo, deleteTodo, getAllTodo,updateTodo } from '../controllers/todoController.js';
import { hasToken } from '../middelware/hashToken.js';

const todoRoute = express.Router()

todoRoute.post('/create', hasToken, createTodo)
todoRoute.get('/getAll', hasToken, getAllTodo)
todoRoute.delete('/deleteTodo/:id', hasToken, deleteTodo)
todoRoute.patch('/update/:id', hasToken, updateTodo)



export default todoRoute
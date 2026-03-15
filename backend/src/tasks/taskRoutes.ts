import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../tasks/task.js';
const router  = express.Router();
router.post('/create', createTask);
router.get('/getAll', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
export default router;
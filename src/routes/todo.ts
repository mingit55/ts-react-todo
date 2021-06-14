import express from 'express';
import controller from '@controllers/todoController';
const router : express.Router = express.Router();
router.get('/', controller.todoIndex);

export default router;
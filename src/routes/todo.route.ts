import { Router } from 'express';
import * as controller from '@controllers/todo.controller';

const router : Router = Router();
router.get('/', controller.todoIndex);

export default router;
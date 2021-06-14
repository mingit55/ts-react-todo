import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import todoRoutes from './todo.route';

const router : Router = Router();
router.get('/', (req: Request, res: Response) => {
  res.redirect('/todo');
});

router.use('/todo', todoRoutes);

export default router;
import { Router } from 'express';

import testController from '../controllers/testController .js';
const router = new Router();

router.get('/', testController.getAll);
router.get('/:testId', testController.getOne);
// router.delete('/:testId', testController.remove);
// router.put('/:id', userController.update);

export default router;

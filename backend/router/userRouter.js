import { Router } from 'express';

import userController from '../controllers/userController.js';
import authenticated from '../middlewares/authenticated.js';
const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/', authenticated, userController.getOne);
router.patch('/', authenticated, userController.update);
// router.get('/', userController.getAll);
// router.delete('/:id', userController.remove);

export default router;

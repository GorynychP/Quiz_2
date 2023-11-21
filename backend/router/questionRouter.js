import { Router } from 'express';

import questionController from '../controllers/questionController.js';
const router = new Router();

router.get('/questions', questionController.getAll);
router.post('/questions', questionController.create);
router.get('/questions/:questionId', questionController.getOne);
router.put('/questions/:questionId', questionController.update);
router.delete('/questions/:questionId', questionController.remove);

export default router;

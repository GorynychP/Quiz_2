import { Router } from 'express';

import testController from '../controllers/testController .js';
import questionController from '../controllers/questionController.js';
import historyController from '../controllers/historyController.js';
const router = new Router();

router.get('/', testController.getMyAll);
router.post('/', testController.create);
router.get('/histories', historyController.getMyAll);
router.post('/history', historyController.create);
router.delete('/history', historyController.remove);
router.post('/:testId', questionController.create);
router.get('/:testId/questions/:questionId', questionController.getOne);
router.put('/questions/:questionId', questionController.update);
router.patch('/:testId', testController.update);
router.delete('/:testId', testController.remove);
router.delete('/:testId/questions/:questionId', questionController.remove);
// router.delete('/:testId', testController.remove);

export default router;

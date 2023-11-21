import { Router } from 'express';
import questionRouter from './questionRouter.js';
import userRouter from './userRouter.js';
import testRouter from './testRouter.js';
import myTestRouter from './myTestRouter.js';
import authenticated from '../middlewares/authenticated.js';
import express from 'express';
const app = express();
const router = express.Router();

router.use('/', userRouter);
router.use('/tests', testRouter);
router.use('/users', userRouter);
router.use('/myTests', authenticated, myTestRouter);
// router.use('/myTests/:testId', authenticated, questionRouter);
// router.use('/tests/:testId', authenticated, questionRouter);

export default router;

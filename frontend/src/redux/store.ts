import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import questions from './slice/questionsSlice';
import oneQuestion from './slice/oneQuestionSlice';
import user from './slice/userSlice';
import tests from './slice/testsSlice';
import history from './slice/historiesSlice';
export const store = configureStore({
	reducer: { questions, oneQuestion, user, tests, history },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

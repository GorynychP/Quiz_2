import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthorTest } from './testsSlice';

export type QuestionType = {
	id: string;
	text: string;
	author: AuthorTest;
	answer: string[] | [];
	options: string[] | [];
};

export enum StatusEnum {
	LOADING = 'loading',
	COMPLETED = 'completed',
	ERROR = 'error',
}

interface QuestionSliceState {
	questions: QuestionType[];
	oneQuestion: QuestionType;
	status: string;
}

const initialState: QuestionSliceState = {
	questions: [],
	oneQuestion: {
		id: '',
		text: '',
		author: {
			id: '',
			name: '',
			surname: '',
		},
		answer: [],
		options: [],
	},
	status: StatusEnum.LOADING,
};

const questionSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<QuestionType[]>) {
			state.questions = action.payload;
		},
		findQuestion(state, action: PayloadAction<string>) {
			const questionIdToFind = action.payload;
			state.oneQuestion =
				state.questions.find(
					(question) => question.id === questionIdToFind,
				) || initialState.oneQuestion;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuestionsAsync.pending, (state) => {
				state.status = StatusEnum.LOADING;
			})
			.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.questions = action.payload;
			})
			.addCase(fetchQuestionsAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.questions = [];
			});
	},
});
export const fetchQuestionsAsync = createAsyncThunk(
	'questions/fetchQuestionsStatus',
	async () => {
		const { data } = await axios.get('http://localhost:3005/editTest', {
			withCredentials: true,
		});
		return data;
	},
);

export const { setItems, findQuestion } = questionSlice.actions;
export default questionSlice.reducer;

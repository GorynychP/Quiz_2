import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { QuestionType, StatusEnum } from './questionsSlice';
import { fetchOneTestAsync } from './testsSlice';

interface QuestionSliceState {
	item: QuestionType;
	status: string;
}

const initialState: QuestionSliceState = {
	item: {
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
	name: 'oneQuestion',
	initialState,
	reducers: {
		setItem(state, action: PayloadAction<QuestionType>) {
			state.item = action.payload;
		},
		deleteOption(state, action: PayloadAction<string>) {
			state.item.options = state.item.options.filter(
				(option) => option !== action.payload,
			);
		},
		setItemText(state, action: PayloadAction<string>) {
			state.item.text = action.payload;
		},
		setItemOptions(state, action: PayloadAction<string[]>) {
			state.item.options = action.payload;
		},
		setItemAnswer(state, action: PayloadAction<string[]>) {
			state.item.answer = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOneQuestionAsync.pending, (state) => {
				state.status = StatusEnum.LOADING;
			})
			.addCase(fetchOneQuestionAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.item = action.payload;
			})
			.addCase(fetchOneQuestionAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.item = initialState.item;
			})
			.addCase(updateQuestionAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.item = action.payload;
			});
	},
});

export const fetchOneQuestionAsync = createAsyncThunk(
	'questions/fetchOneQuestionStatus',
	async ({ testId, questionId }: { testId: string; questionId: string }) => {
		const { data } = await axios.get(
			`http://localhost:3005/myTests/${testId}/questions/${questionId}`,
			{ withCredentials: true },
		);
		return data;
	},
);

export const updateQuestionAsync = createAsyncThunk(
	'questions/updateQuestionStatus',
	async (
		{ testId, newQuestion }: { testId: string; newQuestion: QuestionType },
		{ dispatch },
	) => {
		const { data } = await axios.put(
			`http://localhost:3005/myTests/questions/${newQuestion.id}`,
			newQuestion,
			{ withCredentials: true },
		);
		// dispatch(fetchQuestionsAsync());
		dispatch(fetchOneTestAsync(testId));
		return data;
	},
);

export const {
	setItem,
	setItemText,
	setItemOptions,
	setItemAnswer,
	deleteOption,
} = questionSlice.actions;
export default questionSlice.reducer;

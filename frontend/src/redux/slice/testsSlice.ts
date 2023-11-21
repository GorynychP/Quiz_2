import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { QuestionType, StatusEnum } from './questionsSlice';
export type AuthorTest = {
	id?: string;
	name: string;
	surname: string;
};
export type TestType = {
	id: string;
	name: string;
	author: AuthorTest;
	questions: QuestionType[] | [];
	createdAt: string;
};

interface QuestionSliceState {
	tests: TestType[];
	oneTest: TestType;
	status: string;
	statusOne: string;
	statusMy: string;
	error: string | '';
	lastPage: number;
}

const initialState: QuestionSliceState = {
	tests: [],
	oneTest: {
		id: '',
		name: '',
		author: {
			id: '',
			name: '',
			surname: '',
		},
		questions: [],
		createdAt: '',
	},
	lastPage: 1,
	status: StatusEnum.LOADING,
	statusOne: StatusEnum.LOADING,
	statusMy: StatusEnum.LOADING,
	error: '',
};
export type QuestionInput = {
	text: string;
	answer: string[] | [];
	options: string[] | [];
};
const testsSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<TestType[]>) {
			state.tests = action.payload;
		},
		findQuestion(state, action: PayloadAction<string>) {
			const questionIdToFind = action.payload;
			state.oneTest.questions =
				state.oneTest.questions.filter(
					(question) => question.id === questionIdToFind,
				) || initialState.oneTest.questions;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTestsAsync.pending, (state) => {
				state.status = StatusEnum.LOADING;
			})
			.addCase(fetchOneTestAsync.pending, (state) => {
				state.statusOne = StatusEnum.LOADING;
			})
			.addCase(fetchMyTestsAsync.pending, (state) => {
				state.statusMy = StatusEnum.LOADING;
			})
			.addCase(fetchTestsAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.lastPage = action.payload.lastPage;
				state.tests = action.payload.tests;
			})
			.addCase(fetchMyTestsAsync.fulfilled, (state, action) => {
				state.statusMy = StatusEnum.COMPLETED;
				state.tests = action.payload;
			})
			.addCase(fetchOneTestAsync.fulfilled, (state, action) => {
				state.statusOne = StatusEnum.COMPLETED;
				state.oneTest = action.payload;
			})
			.addCase(updateTestAsync.fulfilled, (state, action) => {
				state.statusOne = StatusEnum.COMPLETED;
				state.oneTest.name = action.payload;
			})
			.addCase(updateTestAsync.rejected, (state, action) => {
				// state.statusOne = StatusEnum.;
				state.error = action.payload;
			})
			.addCase(fetchTestsAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.tests = initialState.tests;
			})
			.addCase(createQuestionAsync.fulfilled, (state, action) => {
				// state.status = StatusEnum.COMPLETED;
				state.oneTest.questions.push(action.payload);
			})
			.addCase(deleteQuestionAsync.fulfilled, (state, action) => {
				// state.status = StatusEnum.COMPLETED;
				state.oneTest.questions = state.oneTest.questions.filter(
					(question) => question.id !== action.payload,
				);
			})
			.addCase(deleteTestAsync.fulfilled, (state, action) => {
				// state.status = StatusEnum.COMPLETED;
				state.tests = state.tests.filter(
					(test) => test.id !== action.payload,
				);
			});
	},
});
export const fetchTestsAsync = createAsyncThunk(
	'tests/fetchTestsStatus',
	async ({
		page,
		PAGINATION_LIMIT,
	}: {
		page: number;
		PAGINATION_LIMIT: number;
	}) => {
		const { data } = await axios.get(
			`http://localhost:3005/tests?page=${page}&limit=${PAGINATION_LIMIT}`,
			{
				withCredentials: true,
			},
		);
		return data;
	},
);
export const fetchMyTestsAsync = createAsyncThunk(
	'myTests/fetchMyTestsStatus',
	async () => {
		const { data } = await axios.get('http://localhost:3005/myTests', {
			withCredentials: true,
		});
		return data;
	},
);
export const fetchOneTestAsync = createAsyncThunk(
	'tests/fetchOneTest',
	async (id: string) => {
		const { data } = await axios.get(`http://localhost:3005/tests/${id}`, {
			withCredentials: true,
		});
		return data;
	},
);
export const createTestAsync = createAsyncThunk(
	'myTests/createTest',
	async (newTest: { name: string }, { dispatch }) => {
		const { data } = await axios.post(
			`http://localhost:3005/myTests/`,
			newTest,
			{ withCredentials: true },
		);
		dispatch(fetchMyTestsAsync());
		return data;
	},
);

export const createQuestionAsync = createAsyncThunk(
	'questions/createQuestionsStatus',
	async ({
		testId,
		newQuestion,
	}: {
		testId: string;
		newQuestion: QuestionInput;
	}) => {
		const { data } = await axios.post(
			`http://localhost:3005/myTests/${testId}`,
			newQuestion,
			{ withCredentials: true },
		);
		return data;
	},
);
export const updateTestAsync = createAsyncThunk(
	'myTests/updateTestStatus',
	async (
		{
			testId,
			updateTest,
		}: { testId: string; updateTest: { name: string } },
		{ rejectWithValue },
	) => {
		const { data } = await axios.patch(
			`http://localhost:3005/myTests/${testId}`,
			updateTest,
			{ withCredentials: true },
		);
		if (data.error) {
			return rejectWithValue(data.error);
		}
		return data.name;
	},
);

export const deleteTestAsync = createAsyncThunk(
	'myTests/deleteTestStatus',
	async (postId: string) => {
		await axios.delete(`http://localhost:3005/myTests/${postId}`, {
			withCredentials: true,
		});
		return postId;
	},
);

export const deleteQuestionAsync = createAsyncThunk(
	'questions/deleteQuestionStatus',
	async ({ testId, questionId }: { testId: string; questionId: string }) => {
		await axios.delete(
			`http://localhost:3005/myTests/${testId}/questions/${questionId}`,
			{ withCredentials: true },
		);
		return questionId;
	},
);

export const { setItems, findQuestion } = testsSlice.actions;
export default testsSlice.reducer;

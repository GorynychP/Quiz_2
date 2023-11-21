import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StatusEnum } from './questionsSlice';
import { AuthorTest } from './testsSlice';

type HistoryType = {
	id: string;
	name: string;
	author: AuthorTest;
	authorTest: string;
	result: number[];
	createdAt: string;
};

interface HistorySliceState {
	histories: HistoryType[];
	status: string;
	error: string | '';
}

const initialState: HistorySliceState = {
	histories: [],
	status: StatusEnum.LOADING,
	error: '',
};

const historySlice = createSlice({
	name: 'histories',
	initialState,
	reducers: {
		// setHistories(state, action: PayloadAction<HistoryType>) {
		// 	state.histories = action.payload;
		// 	state.isAuth = true;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoriesAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.histories = action.payload;
			})
			.addCase(fetchHistoriesAsync.rejected, (state, action) => {
				state.status = StatusEnum.ERROR;
				state.error = action.payload;
				state.histories = initialState.histories;
			})
			.addCase(createHistoryAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.histories.push(action.payload);
			})
			.addCase(deleteHistoryAsync.fulfilled, (state) => {
				state.status = StatusEnum.COMPLETED;
				state.histories = initialState.histories;
			});
	},
});

export const fetchHistoriesAsync = createAsyncThunk(
	'myTests/fetchHistoriesStatus',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				'http://localhost:3005/myTests/histories',
				{
					withCredentials: true,
				},
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const createHistoryAsync = createAsyncThunk(
	'myTests/createHistory',
	async (
		newHistory: { name: string; authorTest: string; result: number[] },
		{ dispatch },
	) => {
		const { data } = await axios.post(
			`http://localhost:3005/myTests/history`,
			newHistory,
			{ withCredentials: true },
		);
		dispatch(fetchHistoriesAsync());
		return data;
	},
);

export const deleteHistoryAsync = createAsyncThunk(
	'myTests/deleteHistory',
	async () => {
		await axios.delete(`http://localhost:3005/myTests/history`, {
			withCredentials: true,
		});
	},
);

// export const { setHistories } = userSlice.actions;
export default historySlice.reducer;

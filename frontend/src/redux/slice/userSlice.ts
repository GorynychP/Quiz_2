import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StatusEnum } from './questionsSlice';
export enum IsRole {
	ADMIN = 0,
	USER = 1,
	GUEST = 3,
}
type UserType = {
	id: string | '';
	email: string | '';
	name: string | '';
	surname: string | '';
	roleId: number | null;
	registeredAt: string | '';
};

interface UserSliceState {
	user: UserType;
	status: string;
	error: string | '';
	isAuth: boolean;
}

const initialState: UserSliceState = {
	user: {
		id: '',
		email: '',
		name: '',
		surname: '',
		roleId: IsRole.GUEST,
		registeredAt: '',
	},
	status: StatusEnum.LOADING,
	isAuth: false,
	error: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserType>) {
			state.user = action.payload;
			state.isAuth = true;
		},
		setEmail(state, action: PayloadAction<string>) {
			state.user.email = action.payload;
		},
		setName(state, action: PayloadAction<string>) {
			state.user.name = action.payload;
		},
		setSurname(state, action: PayloadAction<string>) {
			state.user.surname = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuthAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.user = action.payload;
				state.isAuth = true;
			})
			.addCase(registrationAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.user = action.payload;
				state.isAuth = true;
			})
			.addCase(editUserAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.error = initialState.error;
				state.user = action.payload;
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.error = initialState.error;
				state.user = action.payload;
				state.isAuth = true;
			})
			.addCase(logoutAsync.fulfilled, (state) => {
				state.status = StatusEnum.COMPLETED;
				state.error = initialState.error;
				state.user = initialState.user;
				state.isAuth = false;
			})
			// .addCase(editUserAsync.rejected, (state) => {
			// 	state.status = StatusEnum.ERROR;
			// 	// state.error = action.error.message;
			// 	state.user = initialState.user;
			// })
			.addCase(registrationAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.user = initialState.user;
				state.isAuth = false;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.status = StatusEnum.ERROR;
				state.error = action.payload as string;
				state.user = initialState.user;
				state.isAuth = false;
			});
		// .addCase(updateQuestionAsync.fulfilled, (state, action) => {
		// 	state.status = StatusEnum.COMPLETED;
		// 	state.item = action.payload;
		// });
	},
});

export const registrationAsync = createAsyncThunk(
	'user/registrationStatus',
	async (user, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`http://localhost:3005/register`,
				user,
				{ withCredentials: true },
			);
			sessionStorage.setItem('userData', JSON.stringify(data.user));
			return data.user;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);
export const loginAsync = createAsyncThunk(
	'user/loginStatus',
	async (
		userData: { email: string; password: string },
		{ rejectWithValue },
	) => {
		const { data } = await axios.post(
			`http://localhost:3005/login`,
			userData,
			{ withCredentials: true },
		);
		const { user, error } = data;
		if (error) {
			return rejectWithValue(error);
		}
		if (user) {
			sessionStorage.setItem('userData', JSON.stringify(user));
		}
		return user;
	},
);
export const logoutAsync = createAsyncThunk('/logout', async () => {
	sessionStorage.removeItem('userData');
	await axios.post(
		`http://localhost:3005/logout`,
		{},
		{ withCredentials: true },
	);
});
export const checkAuthAsync = createAsyncThunk('/checkAuth', async () => {
	// sessionStorage.removeItem('userData');
	const { data } = await axios.get(`http://localhost:3005/users`, {
		withCredentials: true,
	});
	if (!data) {
		return;
	}
	return data;
});
export const editUserAsync = createAsyncThunk(
	'/user/updateUser',
	async (
		updateUser: { email: string; name: string; surname: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await axios.patch(
				`http://localhost:3005/users`,
				updateUser,
				{ withCredentials: true },
			);
			if (data.error) {
				return rejectWithValue(data.error);
			}
			if (data.user) {
				sessionStorage.setItem('userData', JSON.stringify(data.user));
			}
			return data.user;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const { setUser, setEmail, setName, setSurname } = userSlice.actions;
export default userSlice.reducer;

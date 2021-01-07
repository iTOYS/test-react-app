import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { UsersListResponse } from '../models/UsersListResponse';
import { UsersSliceState } from '../models/UsersSliceState';
import { Status } from '../models/Status';
import { RootState } from '../app/store';

const initialState: UsersSliceState = {
  currentPage: 0,
  totalPages: -1,
  users: [],
  status: Status.Idle,
  error: null,
  visible: false,
};

export const fetchUsers = createAsyncThunk<
  UsersListResponse,
  void,
  { state: RootState }
>('users/fetchUsers', async (_, api) => {
  const state = api.getState();
  const response = await fetch(
    `https://reqres.in/api/users?delay=2&page=${state.users.currentPage + 1}`
  );
  return response.json();
});

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UsersListResponse>) => {
        state.status = Status.Succeeded;
        state.users = state.users.concat(action.payload.data);
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      }
    );

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = Status.Failed;
      state.error = action.error.message;
    });
  },
});

export const { setVisible } = UsersSlice.actions;
export const selectUsers = (state: RootState): User[] => state.users.users;
export default UsersSlice.reducer;

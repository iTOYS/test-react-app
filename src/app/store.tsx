import { configureStore } from '@reduxjs/toolkit';
import UsersSlice from '../components/UsersSlice';
import { UsersSliceState } from '../models/UsersSliceState';

export default configureStore({
  reducer: {
    users: UsersSlice,
  },
});

export interface RootState {
  users: UsersSliceState;
}

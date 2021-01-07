import { User } from './User';
import { Status } from './Status';

export type UsersSliceState = {
  currentPage: number;
  totalPages: number;
  users: User[];
  status: Status;
  error: string | null | undefined;
  visible: boolean;
};

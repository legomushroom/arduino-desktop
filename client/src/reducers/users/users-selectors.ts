import { IUser, IUsersList, IUserStatus, ISelectedUsers } from 'reducers/users/users-interfaces';

export const getUsers = (state, status: IUserStatus): IUsersList => {
  const usersType = IUserStatus[status].toLowerCase();

  return state.users.users[usersType];
};

export const getSelectedUsers = (state): ISelectedUsers => {
  return state.users.selected;
};

export const getNewStatuses = (state): { [key: string]: string; } => {
  return state.users.newStatuses;
};

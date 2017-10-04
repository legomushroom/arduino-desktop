import { createActionCreator, createSimpleActionCreator } from 'reducers/action-creators';
import { IUser, IUsersList, IUserStatus } from 'reducers/users/users-interfaces';

export const setUsers = createActionCreator<{ users: IUsersList, status: IUserStatus }>('users.add.users');
export const resetUserStatus = createActionCreator<IUser>('user.reset.status');

export const selectUsers = createActionCreator<IUsersList>('users.select.users');
export const toggleUser = createActionCreator<string>('users.toggle.user');

export interface IMoveObject {
  from: IUserStatus;
  to: IUserStatus;
  users: IUsersList;
};

export const moveUsers = createActionCreator<IMoveObject>('users.move.from.to');

export interface ISetAllUsersSelection {
  section: IUserStatus;
  setTo: boolean;
}

export const selectAllUsersSelection = createActionCreator<ISetAllUsersSelection>('users.set.all.selection.to');

export interface ISetUsersSelection {
  users: string[];
  setTo: boolean;
}

export const selectUsersSelection = createActionCreator<ISetUsersSelection>('users.set.users.selection.to');

export const addUsersNewStatus = createActionCreator<IMoveObject>('users.add.users.new.users');

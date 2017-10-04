import { Action } from 'redux';

import {
  setUsers,
  toggleUser,
  moveUsers,
  resetUserStatus,
  IMoveObject,
  selectAllUsersSelection,
  selectUsersSelection,
  addUsersNewStatus
} from 'reducers/users/users-actions';
import { capitalizeText } from 'utils/capitalize-text';
import { IUser, IUsersList, IUserStatus, ISelectedUsers } from 'reducers/users/users-interfaces';

interface IUsersTable {
  [key: string]: IUsersList;
};

interface IUsersState {
  users: IUsersTable;
  selected: ISelectedUsers;
  newStatuses: { [key: string]: string; }
}

const initialState: IUsersState = {
  users: {
    pending: [],
    accepted: [],
    deleted: [],
  },
  selected: {},
  newStatuses: {}
};

const setUsersRoutine = (to: IUserStatus, state: IUsersState, users: IUsersList): IUsersState => {
  const typeName = IUserStatus[to].toLowerCase();

  return {
    ...state,
    users: {
      ...state.users,
      [typeName]: [ ...users ]
    }
  };
};

const setAllUsersSelectionRoutine = (to: IUserStatus, state: IUsersState, isSelected: boolean = true): IUsersState => {
  const typeName = IUserStatus[to].toLowerCase();
  const newState = { ...state };
  newState.selected = { ...state.selected };

  state.users[typeName].map((user, i) => {
    newState.selected[user.id] = isSelected;
  });

  return newState;
};

const setUsersSelectionRoutine = (users: string[], state: IUsersState, isSelected: boolean = true): IUsersState => {
  const newState = { ...state };
  newState.selected = { ...state.selected };

  users.map((user, i) => {
    newState.selected[user] = isSelected;
  });

  return newState;
};

const toggleUserSelectionRoutine = (state: IUsersState, id: string): IUsersState => {
  return {
    ...state,
    selected: {
      ...state.selected,
      [id]: !state.selected[id]
    }
  };
};

const addUsersNewStatusRoutine = (state: IUsersState, users, status: IUserStatus): IUsersState => {
  users = Object.keys(users);

  const newState = { ...state };
  const statusString = IUserStatus[status].toLowerCase();
  newState.newStatuses = { ...state.newStatuses };

  users.map((user, i) => {
    newState.newStatuses[user] = statusString;
  });

  return newState;
};

const resetUserStatusRoutine = (state: IUsersState, user: IUser): IUsersState => {
  const newState = { ...state };
  newState.newStatuses = { ...state.newStatuses };

  delete newState.newStatuses[user.id];
  return newState;
};

export const usersReducer = (state: IUsersState = initialState, action: Action): IUsersState => {
  switch (action.type) {

      case setUsers.type: {
        const payload = setUsers.unwrap(action);
        const { users, status } = payload;
        return setUsersRoutine(status, state, users);
      }

      case toggleUser.type: {
        return toggleUserSelectionRoutine(state, toggleUser.unwrap(action));
      }

      case selectAllUsersSelection.type: {
        const options = selectAllUsersSelection.unwrap(action);
        return setAllUsersSelectionRoutine(options.section, state, options.setTo);
      }
      
      case selectUsersSelection.type: {
        const options = selectUsersSelection.unwrap(action);
        return setUsersSelectionRoutine(options.users, state, options.setTo);
      }

      case addUsersNewStatus.type: {
        const options = addUsersNewStatus.unwrap(action);
        return addUsersNewStatusRoutine(state, options.users, options.to);
      }

      case resetUserStatus.type: {
        const user = resetUserStatus.unwrap(action);
        return resetUserStatusRoutine(state, user);
      }

      default:
        return state;
  }
};

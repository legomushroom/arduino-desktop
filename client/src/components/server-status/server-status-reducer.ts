import { Action } from 'redux';
import { IServerState } from './server-status-interfaces';
import { setServerStatus } from './server-status-actions';

export interface IServerStatusState {
  status: IServerState;
};

const initialState: IServerStatusState = {
  status: IServerState.Disconnected
};

export const serverStatusReducer = (state: IServerStatusState = initialState, action: Action): IServerStatusState => {
  switch (action.type) {
      case setServerStatus.type: {
        return {
          ...state,
          status: setServerStatus.unwrap(action)
        }
      }

      default: {
        return state;
      }
  }
};

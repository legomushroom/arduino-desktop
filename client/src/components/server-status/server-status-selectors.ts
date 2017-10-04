import { IServerStatusState } from 'components/server-status/server-status-reducer';

export const getServerStatus = (state): IServerStatusState => {
  return state.serverStatus;
};

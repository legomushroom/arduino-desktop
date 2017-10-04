import { createActionCreator, createSimpleActionCreator } from 'reducers/action-creators';
import { IServerState } from './server-status-interfaces';

export const setServerStatus = createActionCreator<IServerState>('set.server.status');

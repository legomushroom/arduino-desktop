import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';
import pageFactory from '../page';

const buttons = [
  {
    text: 'queue',
    className: '',
    toSection: IUserStatus.Pending
  },
  {
    text: 'approve',
    className: 'isGreen',
    toSection: IUserStatus.Accepted
  }
];

export const DeletedPage = pageFactory(IUserStatus.Deleted, buttons);

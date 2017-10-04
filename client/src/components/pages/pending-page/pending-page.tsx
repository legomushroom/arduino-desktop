import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';
import pageFactory from '../page';

const buttons = [
  {
    text: 'approve',
    className: 'isGreen',
    toSection: IUserStatus.Accepted
  },
  {
    text: 'delete',
    className: 'isRed',
    toSection: IUserStatus.Deleted
  }
];

export const PendingPage = pageFactory(IUserStatus.Pending, buttons);

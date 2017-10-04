import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';
import pageFactory from '../page';

const buttons = [
  {
    text: 'terminate',
    className: '',
    toSection: IUserStatus.Pending
  },
  {
    text: 'delete',
    className: 'isRed',
    toSection: IUserStatus.Deleted
  }
];

export const AcceptedPage = pageFactory(IUserStatus.Accepted, buttons);

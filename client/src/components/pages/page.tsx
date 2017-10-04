import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import socket from '../../socket';
import { Link } from 'preact-router/match';
import { style } from 'decorators/style';
import { UsersList, IButton } from 'components/users-list/users-list';
import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';
import { getUsers } from 'reducers/users/users-selectors';
import {
  selectAllUsersSelection,
  selectUsersSelection,
  moveUsers,
  addUsersNewStatus,
  IMoveObject
} from 'reducers/users/users-actions';
import { getConfirmationFor } from 'components/confirm-modal/confirm-modal-actions';

import styles from './page.scss';

interface IPendingPageProps {
  path?: string;
  users: IUsersList;
};

interface IPendingPageCallbacks {
  onSelectAll: (e) => void;
  moveUsers: (move: IMoveObject) => void;
  confrimUsersMoveAction;
};

const mapUsers = (usersList, usersMap) => {
  const users = [];

  for (let i = 0; i < usersList.length; i++) {
    const user = usersList[i];
    if (usersMap[user.id]) { users.push(user); }
  }

  return users;
};

export default (section, buttons = []) => {

  @style(styles)
  class PageComponent extends Component<IPendingPageProps & IPendingPageCallbacks, {}> {
    private buttons: IButton[];
    private requestUsersTimer: number;
  
    private createButtons() {
      if (!buttons.length) { return; }

      this.buttons = buttons.map((button, i) => {
        return {
          text: button.text,
          className: button.className,
          onClick: (users, e) => {
            e.stopPropagation();
            const isSure = e.metaKey || e.ctrlKey;
            
            if (isSure) {
              this.props.moveUsers({
                from: section,
                to: button.toSection,
                users
              });
            } else {
              this.props.confrimUsersMoveAction(mapUsers(this.props.users, users), button.text, () => {
                this.props.moveUsers({
                  from: section,
                  to: button.toSection,
                  users
                });
              });
            }
          }
        };
      });
    }
  
    render () {
      const { users } = this.props;
      !this.buttons && this.createButtons();
  
      return (
        <div>
          <UsersList
            users={users}
            onSelectAllClick={this.props.onSelectAll}
            buttons={this.buttons} />
        </div>
      );
    }
  
    private requestUsers = () => {
      socket.requestUsers(section);
    }
  
    public componentDidMount() {
      this.requestUsersTimer = window.setInterval(this.requestUsers, 1000);
      this.requestUsers();
    }
  
    public componentWillUnmount() {
      clearTimeout(this.requestUsersTimer);
    }
  };
  
  const mapStateToProps = (state, props) => {
    const users = getUsers(state, section);
    // users.sort((a, b) => {
    //   return a.signUpDate - b.signUpDate;
    // });
  
    return { users };
  };
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onSelectAll(e) {
        dispatch(selectAllUsersSelection({
          section: section,
          setTo: e.target.checked
        }));
      },
      moveUsers(move: IMoveObject) {
        dispatch(addUsersNewStatus(move));
        dispatch(selectUsersSelection({
          users: Object.keys(move.users),
          setTo: false
        }));
        
        socket.moveUsers(move);
      },
      confrimUsersMoveAction(users: IUsersList, actionName: string, onConfirm) {
        dispatch(getConfirmationFor({ users, actionName, onConfirm }));
      }
    };
  };
  
  return connect(mapStateToProps, mapDispatchToProps)(PageComponent);
};

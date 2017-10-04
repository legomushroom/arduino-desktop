import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { style } from 'decorators/style';
import { capitalizeText } from 'utils/capitalize-text';
import { getServerStatus } from './server-status-selectors';
import { IServerState } from './server-status-interfaces';

import styles from './server-status.scss';

interface IServerStatusComponent {
  className?: string;
  status?: IServerState;
};

@style(styles)
export class ServerStatusComponent extends Component<IServerStatusComponent, {}> {
  private getStatusClass() {
    const { status } = this.props;

    if (status === IServerState.Connected) {
      return 'isGreen';
    }

    return 'isRed';
  }

  render () {
      const { className, status } = this.props;
      
      return (
        <div className={`serverStatus ${className}`}>
          <span className={`serverStatusCircle ${this.getStatusClass()}`} />
          <span className='title'>{ capitalizeText(IServerState[status]) }</span>
        </div>
      );
  }
};

const mapStateToProps = (state, props) => {
  const serverStatus = getServerStatus(state);

  return {
    status: serverStatus.status
  };
}

export const ServerStatus = connect(mapStateToProps)(ServerStatusComponent);

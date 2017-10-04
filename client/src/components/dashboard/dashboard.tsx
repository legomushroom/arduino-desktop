import { h, Component } from 'preact';
import io from 'socket.io-client';

import { style } from 'decorators/style';

import styles from './dashboard.scss';

import { Button } from 'components/button/button';

interface IDashboardProps {
  className?: string;
};

interface IDashboardState {
  distance: number;
};

@style(styles)
export class Dashboard extends Component<IDashboardProps, IDashboardState> {
  private socket;

  public constructor(props) {
    super(props);

    this.state = {
      distance: void 0
    };
  }

  onPressUp = () => {
    this.socket.emit('press up');
  }

  onPressDown = () => {
    this.socket.emit('press down');
  }

  onButtonRelease = () => {
    this.socket.emit('press release');
  }
  
  public componentDidMount() {
    const { location } = window;
    const { hostname, port, protocol } = location;

    this.socket = io(`${protocol}//${hostname}:${port}`);

    this.socket.on('connect', () => {
      this.socket.on('distance', (distance) => {
        this.setState({ distance });
      });
      // this.socket.on('reset user status', (user) => {});
    });
    
    this.socket.on('disconnect', () => {
      console.log('disconnected!');
    });
  }

  render () {
    return (
      <div className={`dashboard ${this.props.className || ''}`}>
        <div className={`distance`}>
            {this.state.distance}<span className="distance-units">cm</span>
        </div>
        <Button
          text='Move up'
          className='button'
          onMouseDown={this.onPressUp}
          onMouseUp={this.onButtonRelease} />
        <Button
          text='Move down'
          className='button'
          onMouseDown={this.onPressDown}
          onMouseUp={this.onButtonRelease} />
      </div>
    );
  }
};


import { h, render, Component } from 'preact';
import { Provider } from 'preact-redux';
import Router from 'preact-router';

import { style } from './decorators/style';
// import { store } from './store';

import styles from './app.scss';

import { Dashboard } from 'components/dashboard/dashboard';

export interface IApp {}

import commonPageStyles from 'components/pages/page.scss';

@style(styles)
class App extends Component<IApp, {}> {
  render () {
    return (
      <Provider store={{}}>
        <div className='app'>
          <Dashboard />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#js-arduino-desktop-app'));

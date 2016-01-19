import React, { Component, PropTypes } from 'react';
import isDev from 'isdev';
import DevTools from './DevTools'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const ReduxMonitor = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
    return (
      <div> {this.props.children}
	{ReduxMonitor}
      </div>
    );
  }
}

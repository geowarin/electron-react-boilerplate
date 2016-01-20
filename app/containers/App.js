import React, { Component, PropTypes } from 'react';
import DevTools from './DevTools';

import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

import {Window, Toolbar, Content, Pane, NavGroup, NavGroupItem, NavTitle} from 'react-photonkit';

export class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const ReduxMonitor = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
    return (
      <Window>
	<Toolbar title="Electron and react!"/>
	<Content>
	  <Pane ptSize="sm" sidebar>
	    <NavGroup activeKey={this.props.routing.location.pathname}
		      onSelect={(key) => this.handleSelect(key)} draggable>
	      <NavTitle>Menu</NavTitle>
	      <NavGroupItem eventKey="/" glyph="home" text="home"/>
	      <NavGroupItem eventKey="counter" glyph="clock" text="counter"/>
	    </NavGroup>
	  </Pane>

	  <div className="padded-more">
	    {this.props.children}
	    {ReduxMonitor}
	  </div>
	</Content>
	<Toolbar psType="footer"/>
      </Window>
    );
  }

  handleSelect(key) {
    this.props.replacePath(key);
  }
}

export default connect(
  ({routing}) => ({routing}),
  {replacePath: routeActions.replace}
)(App)

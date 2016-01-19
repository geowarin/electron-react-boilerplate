import React, { Component, PropTypes } from 'react';
import isDev from 'isdev';
import DevTools from './DevTools';

import {Window, Toolbar, Content, Pane, NavGroup, NavGroupItem, NavTitle} from 'react-photonkit';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const ReduxMonitor = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
    return (
      <Window>
	<Toolbar title="basic template"/>
	<Content>
	  <Pane ptSize="sm" sidebar>
	    <NavGroup activeKey={1} onSelect={(key) => this.handleSelect(key)} draggable>
	      <NavTitle>Menu</NavTitle>
	      <NavGroupItem eventKey="home" glyph="home" text="home"/>
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
    console.log(key);
  }
}

import React, {Component, PropTypes} from 'react';
import DevTools from './DevTools';

import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';

import {remote} from 'electron';
import {Window, Toolbar, Content, Pane, NavGroup, NavGroupItem, NavTitle} from 'react-photonkit';

const dialog = remote.dialog;

import style from '../app.styl';

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
            <NavGroup activeKey="" onSelect={() => this.openFile()} draggable>
              <NavTitle>Actions</NavTitle>
              <NavGroupItem glyph="attach" text="Open file..."/>
            </NavGroup>
          </Pane>

          <div className="padded-more full">
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

  openFile() {
    const selected = dialog.showOpenDialog({properties: ['openFile']});
    console.log("Selected file", selected);
    if (selected) {
      dialog.showMessageBox({type: 'info', buttons: ['Great!'], title: 'File selected', message: 'You have selected ' + selected});
    }
  }
}

export default connect(
  ({routing}) => ({routing}),
  {replacePath: routeActions.replace}
)(App)

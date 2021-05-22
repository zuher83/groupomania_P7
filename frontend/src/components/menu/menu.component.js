import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawerComponent from './drawer.component';
import ToolbarComponent from './toolbar.component';

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      leftSideBar: false
    };
  }

  toggleDrawer() {
    this.setState({ leftSideBar: false });
  }

  openDrawer() {
    this.setState({
      leftSideBar: true
    });
  }

  render() {
    return (
      <div>
        <ToolbarComponent
          openDrawerHandler={this.openDrawer}
          parentProps={this.props}
        />
        <DrawerComponent
          leftSideBar={this.state.leftSideBar}
          toggleDrawerHandler={this.toggleDrawer}
          parentProps={this.props}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.auth;

  return {
    user,
    isLoggedIn
  };
}

export default connect(mapStateToProps)(AppMenu);

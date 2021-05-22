import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import { logout } from './../../actions/auth';

import { history } from './../../helpers/history';

const styles = () => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

class DrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getHome = this.getHome.bind(this);
    this.getFriendFeed = this.getFriendFeed.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.getMyProfile = this.getMyProfile.bind(this);
    this.state = {
      leftSideBar: false
    };
  }

  getHome() {
    history.push('/home');
  }

  getFriendFeed() {
    history.push('/friends-feed');
  }

  getAllUser() {
    history.push('/users');
  }

  getMyProfile() {
    history.push(`/user/${this.props.parentProps.user.user_id}`);
  }

  logOut() {
    this.props.parentProps.dispatch(logout());
    history.push('/');
  }

  render() {
    const { classes } = this.props;

    const sideList = () => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.props.toggleDrawerHandler}
        onKeyDown={this.props.toggleDrawerHandler}
      >
        <List>
          <ListItem button key="Accueil" onClick={this.getHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem button key="people" onClick={this.getAllUser}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Tous Les Membres" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="profile" onClick={this.getMyProfile}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Mon Profile" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <Drawer
        open={this.props.leftSideBar}
        onClose={this.props.toggleDrawerHandler}
      >
        {sideList('leftSideBar')}
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerComponent);

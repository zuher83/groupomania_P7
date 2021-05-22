import React from 'react';
import { connect } from 'react-redux';
import { history } from './../../helpers/history';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from './../../actions/auth';
import { Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = (theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    marginRight: 10
  },
  inputRoot: {
    color: 'inherit'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  menuLink: {
    color: '#FFF',
    textDecoration: 'none'
  }
});

class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.getMyProfile = this.getMyProfile.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      anchorEl: false,
      MobileMoreAnchorEl: false
    };
  }

  getHome() {
    history.push('/home');
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

  handleProfileMenuOpen(event) {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleMobileMenuClose() {
    this.setState({
      mobileMoreAnchorEl: null
    });
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null,
      mobileMoreAnchorEl: null
    });
  }

  handleMobileMenuOpen(event) {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  }

  render() {
    const { classes } = this.props;
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const menuId = 'user-menu-avatar';
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.getMyProfile}>
          <IconButton aria-label="mon-profile" color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <span>Mon profile</span>
        </MenuItem>
        <MenuItem onClick={this.logOut}>
          <IconButton aria-label="logout" color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
          <span>Deconnexion</span>
        </MenuItem>
      </Menu>
    );

    const mobileMenuId = 'user-menu-avatar-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.getMyProfile}>
          <IconButton aria-label="mon-profile" color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <span>Mon profile</span>
        </MenuItem>
        <MenuItem onClick={this.logOut}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
          <p>Deconnexion</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.openDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Groupomania
            </Typography>
            <Typography
              className={
                (classes.title, classes.menuButton, classes.sectionDesktop)
              }
              variant="h6"
            >
              <Button className={classes.menuLink} onClick={this.getHome}>
                Accueil
              </Button>
              <Button className={classes.menuLink} onClick={this.getAllUser}>
                Tous les membres
              </Button>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                className={(classes.title, classes.menuLink)}
                onClick={this.getMyProfile}
              >
                {this.props.parentProps.user.name}{' '}
                {this.props.parentProps.user.last_name}
              </Button>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  src={this.props.parentProps.user.image}
                  alt="User avatar"
                />
              </IconButton>
              {/* {renderMenu} */}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }
}

export default connect(null, {})(withStyles(styles)(ToolbarComponent));

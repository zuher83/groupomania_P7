import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Material Ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { logout } from './../actions/auth';

import { history } from './../helpers/history';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 10
  },
  title: {
    flexGrow: 1,
    display: 'inline-flex',
    alignItems: 'center'
  },
  menuItem: {
    marginRight: 15
  },
  menuButtons: {
    display: 'flex',
    flexDirection: 'column'
  },
  menuLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
});
class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      currentUser: undefined,
      anchorEl: null,
      open: false
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        anchorEl: null,
        open: Boolean(this.state.anchorEl)
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
    history.push('/');
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget)
    });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { open, anchorEl } = this.state;
    const { user, classes } = this.props;
    const currentUser = user;

    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.menuItem}>
              Groupomania
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
              <Link
                to={'/home'}
                className={classes.menuLink}
                variant="body2"
                color="inherit"
              >
                Accueil
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
              <Link
                to={`/user/${currentUser.user_id}`}
                className={classes.menuLink}
                variant="body2"
              >
                Mon Profile
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
              <Link to={`/users`} className={classes.menuLink} variant="body2">
                Tous les membres
              </Link>
            </Typography>
          </div>

          <Typography variant="overline">
            {currentUser.name} {currentUser.last_name}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            {/* <AccountCircle /> */}
            {currentUser.image ? (
              <Avatar aria-label="recipe" src={currentUser.image} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Mon Profile</MenuItem>
            <MenuItem onClick={this.logOut}>Déconnecter</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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

export default connect(mapStateToProps)(withStyles(styles)(AppMenu));

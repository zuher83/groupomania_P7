import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Login from './pages/login.page';
import Register from './pages/register.page';
import PublicHome from './pages/public.page';
import Home from './pages/home.page';
import FeedFollowed from './pages/feed-followed.page';
import Profile from './pages/profile.page';
import ProfileList from './pages/profile-list.page';

import MenuNavigation from './components/menu.component';

import { clearMessage } from './actions/message';
import Message from './components/message.component';

import { history } from './helpers/history';
import { PrivateRoute } from './helpers/private';
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

/**
 * Racine de l'application
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      anchorEl: null,
      open: false,
      message: '',
      severity: 'success'
    };
    history.listen(() => {
      props.dispatch(clearMessage());
    });
  }

  /**
   * On charge l'utilisateur dans le state
   *
   * @memberof App
   */
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

  /**
   * Affiche un message si la props message est mis à jour
   * Quand on appelle setMessage indiquer deux parametres
   * comme suivant {message: 'Votre message', severity: 'success'}
   *
   * @param {*} prevProps
   * @memberof App
   */
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message.message,
        severity: this.props.message.severity
      });
    }
  }

  /**
   * Rendu avec les routes public et privé
   * On vérifie si le user est connecté pour afficher la barre de menu
   *
   * @return {*}
   * @memberof App
   */
  render() {
    const { classes, isLoggedIn } = this.props;
    return (
      <Router history={history}>
        <div className={classes.root}>
          {isLoggedIn && <MenuNavigation />}
          <div>
            <Switch>
              <Route exact path="/" component={PublicHome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute path="/user/:id" component={Profile} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute
                exact
                path="/friends-feed"
                component={FeedFollowed}
              />
              <PrivateRoute exact path="/users" component={ProfileList} />
            </Switch>
          </div>
          {this.state.message && (
            <Message
              message={this.state.message}
              severity={this.state.severity}
            />
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    message,
    isLoggedIn
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));

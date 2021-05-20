import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { withStyles } from '@material-ui/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Paper,
  Link,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

const styles = () => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '10vh',
    height: '100vh'
  },
  paper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: 5,
    backgroundColor: 'red'
  },
  welcome: {
    textShadow: '2px 2px 7px #DFDFDF',
    textAlign: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 5
  },
  submit: {
    margin: 5
  }
});

/**
 * Component pous se connecter à l'application
 *
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }

  /**
   * Implementation du champ email au fur et à mesure
   * à stocker dans le state
   *
   * @param {*} e
   * @memberof Login
   */
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  /**
   * Implementation du champ password au fur et à mesure
   * à stocker dans le state
   *
   * @param {*} e
   * @memberof Login
   */
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  /**
   * Envoi des donnés au backend pour la connection
   *
   * @param {*} e
   * @memberof Login
   */
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    const { dispatch, history } = this.props;

    if (this.state.email && this.state.password) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push('/home');
          // window.location.reload(false);
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  /**
   * Rendu du component
   *
   * @return {*} component
   * @memberof Login
   */
  render() {
    const { isLoggedIn, classes } = this.props;

    if (!isLoggedIn) {
      return (
        <Fragment>
          <CssBaseline />

          <Box className={(classes.root, classes.image)}>
            <Container>
              <Grid
                container
                // component="main"
                direction="row"
                justify="center"
                // alignItems="center"
              >
                <Grid item xs={false} sm={3} md={7}>
                  <Typography
                    component="h1"
                    variant="h3"
                    className={classes.welcome}
                  >
                    Bienvenue Sur Groupomania
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <div className={classes.paper}>
                    <Avatar
                      className={classes.avatar}
                      src="/groupomania-img1.png"
                      alt="loge groupomania"
                    />
                    <Typography component="h1" variant="h5">
                      Connexion
                    </Typography>
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c;
                      }}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Se souvenir de moi"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.state.loading}
                      >
                        Se Connecter
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Mot de passe oublié?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {'Créer un compte'}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Fragment>
      );
    } else {
      return <Redirect to="/home" />;
    }
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Login));

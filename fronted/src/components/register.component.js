import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Button,
  Avatar,
  Paper
} from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import MessageComp from './message.component';
import { setMessage } from './../actions/message';

const styles = () => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
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
 * Component d'inscription
 *
 * @class Register
 * @extends {Component}
 */
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

    if (!ValidatorForm.hasValidationRule('isPasswordMatch')) {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.password) {
          return false;
        }
        return true;
      });
    }

    this.state = {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',

      successful: false,
      message: '',
      severity: 'success'
    };
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule('isPasswordMatch')) {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    }
  }

  /**
   * Suit les changement du champ name pour les integrer dans le state
   *
   * @param {*} e valeur de saisie
   * @memberof Register
   */
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  /**
   * Suit les changement du champ last_name pour les integrer dans le state
   *
   * @param {*} e valeur de saisie
   * @memberof Register
   */
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  /**
   * Suit les changement du champ email pour les intégrer dans le state
   *
   * @param {*} e valeur de saisie
   * @memberof Register
   */
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  /**
   * Suit les changement du champ password pour les intégrer dans le state
   *
   * @param {*} e valeur de saisie
   * @memberof Register
   */
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  /**
   * Suit les changement du champ password_confirm pour les intégrer dans le state
   *
   * @param {*} e valeur de saisie
   * @memberof Register
   */
  onChangePasswordConfirm(e) {
    this.setState({
      password_confirm: e.target.value
    });
  }

  /**
   * Envoi le formulaire d'inscription au backend
   *
   * @param {*} e
   * @memberof Register
   */
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.props
      .dispatch(
        register(
          this.state.name,
          this.state.last_name,
          this.state.email,
          this.state.password
        )
      )
      .then(() => {
        this.setState({
          successful: true,
          message:
            'Compte créé avec succés, vous allez être redirigé pour vous connecter',
          severity: 'success'
        });

        setTimeout(() => {
          this.props.history.push('/login');
        }, 3000);
      })
      .catch(() => {
        this.setState({
          successful: false,
          message: 'Votre compte ne peut être créé!',
          severity: 'danger'
        });
      });
  }

  /**
   * Rendu du formulaire d'incription
   *
   * @return {*}
   * @memberof Register
   */
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Box className={(classes.root, classes.image)}>
          <Container>
            <Grid container direction="row" justify="center">
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
                  />
                  <Typography component="h1" variant="h5">
                    Inscription
                  </Typography>
                  <ValidatorForm
                    className={classes.form}
                    noValidate
                    onSubmit={this.handleRegister}
                    onError={(errors) => console.log(errors)}
                    ref={(r) => (this.form = r)}
                  >
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Nom"
                      name="name"
                      autoComplete="name"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      validators={['required']}
                      errorMessages={['Veuillez indiquer votre nom']}
                    />
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="last_name"
                      label="Prénom"
                      name="last_name"
                      autoComplete="last_name"
                      autoFocus
                      value={this.state.last_name}
                      onChange={this.onChangeLastName}
                      validators={['required']}
                      errorMessages={['Veuillez indiquer votre prénom']}
                    />
                    <TextValidator
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
                      validators={['required', 'isEmail']}
                      errorMessages={['Veuillez indiquer un email valide']}
                    />
                    <TextValidator
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
                      validators={['required']}
                      errorMessages={[
                        'Veuillez indiquer un mot de passe valide'
                      ]}
                    />
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password_confirm"
                      label="Confirmer Mot de passe"
                      type="password"
                      id="password_confirm"
                      value={this.state.password_confirm}
                      onChange={this.onChangePasswordConfirm}
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['Les mot de passes ne correspondent pas']}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      S{"'"}Incrire
                    </Button>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <MessageComp
          message={this.state.message}
          severity={this.state.severity}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Register));

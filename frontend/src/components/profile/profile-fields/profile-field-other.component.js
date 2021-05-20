import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editProfile, deleteUser } from '../../../actions/auth';
import PropTypes from 'prop-types';

import { setMessage } from '../../../actions/message';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5,
      width: '47%'
    }
  },
  editIconField: { fontSize: 13, cursor: 'pointer', marginLeft: 10 }
});

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      user_id: this.props.user_id.user_id,
      name: this.props.user_id.name,
      last_name: this.props.user_id.last_name,
      email: this.props.user_id.email,
      password: this.props.user_id.password,

      editable: false,
      form_valid: false,
      modal_open: false
    };
  }

  componentDidMount() {
    if (this.props.bio) {
      this.setState({ bio: this.props.bio });
    }
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (userViewer.user_id === this.props.user_id.user_id) {
      this.setState({
        editable: true
      });
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition du poste
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof ProfileSettings
   */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * Ouvre un modal pour éditer l'avatar
   *
   * @memberof ProfileSettings
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }

  /**
   * Soumission des changements du profile au backend hors image et image_cover
   *
   * @memberof ProfileSettings
   */
  async handleFormSubmit() {
    event.preventDefault();
    var datas = {
      bio: this.state.bio
    };
    this.props
      .editProfile(this.props.user_id, datas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Votre biographie est mis à jour!'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Impossible de mettre à jour votre biographie!!',
          severity: 'error'
        });
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileSettings
   */
  handleClose() {
    this.setState({
      form_valid: false,
      modal_open: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography
          variant="h5"
          color="textSecondary"
          onClick={this.handleClickOpen}
        >
          <b>
            {this.state.name} {this.state.last_name}
          </b>
          {this.state.editable === true && (
            <SettingsIcon
              className={classes.editIconField}
              onClick={this.handleClickOpen}
            />
          )}
        </Typography>

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Editer votre profil</DialogTitle>
          <form className={classes.root} onSubmit={this.handleFormSubmit}>
            <DialogContent>
              <div>
                <TextField
                  id="edit-name"
                  defaultValue={this.state.name}
                  name="name"
                  label="Prénom"
                  fullWidth
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  className={classes.userModalEdit}
                  variant="outlined"
                >
                  Prénom
                </TextField>
                <TextField
                  id="edit-last-name"
                  defaultValue={this.state.last_name}
                  name="last_name"
                  label="Nom"
                  fullWidth
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  className={classes.userModalEdit}
                  variant="outlined"
                >
                  Nom
                </TextField>
                <TextField
                  id="edit-email"
                  defaultValue={this.state.email}
                  name="email"
                  label="Email"
                  fullWidth
                  type="email"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  className={classes.userModalEdit}
                  variant="outlined"
                >
                  Email
                </TextField>
                <TextField
                  id="edit-password"
                  defaultValue={this.state.password}
                  name="password"
                  label="Password"
                  fullWidth
                  type="password"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  className={classes.userModalEdit}
                  variant="outlined"
                >
                  Email
                </TextField>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Annuler
              </Button>
              <Button type="submit" color="primary">
                Valider
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}

ProfileSettings.propTypes = {
  user_id: PropTypes.object.isRequired
};

// export default connect(mapStateToProps, {
//   editProfile,
//   deleteUser,
//   setMessage
// })(withStyles(styles)(ProfileWorkDepartment));
export default connect(null, { editProfile, deleteUser, setMessage })(
  withStyles(styles)(ProfileSettings)
);

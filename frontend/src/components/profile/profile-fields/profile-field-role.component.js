import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editProfile, deleteUser } from '../../../actions/auth';
import PropTypes from 'prop-types';

import { setMessage } from '../../../actions/message';
import UserService from '../../../services/user.service';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

const styles = () => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5,
      width: '47%'
    }
  },
  editIconField: { cursor: 'pointer' },
  iconButton: {
    position: 'absolute',
    bottom: 5,
    left: 70
  }
});

class ProfileRole extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      user: '',
      actualRole: '',
      role: '',

      role_editable: false,
      form_valid: false,
      modal_open: false
    };
  }

  componentDidMount() {
    this.updateRole();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user_id !== this.props.user_id) {
      this.updateRole();
    }
  }

  updateRole() {
    if (this.props.user_id.user_id) {
      this.setState({ user: this.props.user_id });
      UserService.getRole(this.props.user_id.user_id)
        .then((result) => {
          this.setState({
            actualRole: result.data.roleId,
            role: result.data.roleId
          });
        })
        .catch(() => {
          this.props.setMessage({
            message: 'Erreur lors du chargement du rôle!',
            severity: 'error'
          });
        });
    }

    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (userViewer.roles[0] === 'ROLE_ADMIN') {
      this.setState({
        role_editable: true
      });
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition du poste
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof ProfileRole
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
   * @memberof ProfileRole
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }

  /**
   * Soumission des changements du profile au backend hors image et image_cover
   *
   * @memberof ProfileRole
   */
  async handleFormSubmit() {
    event.preventDefault();
    var datas = {
      roleId: this.state.role,
      userId: this.state.user.user_id
    };
    UserService.updateRole(this.state.user.user_id, datas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Le rôle est mis à jour!'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Impossible de mettre à jour le rôle!',
          severity: 'error'
        });
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileRole
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
        {this.state.role_editable === true && (
          <Fab
            color="primary"
            className={(classes.fab, classes.iconButton)}
            onClick={this.handleClickOpen}
            size="small"
          >
            <SupervisedUserCircle className={classes.editIconField} />
          </Fab>
        )}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Editer le rôle du membre</DialogTitle>
          <form className={classes.root} onSubmit={this.handleFormSubmit}>
            <DialogContent>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="select-role">Role</InputLabel>
                  <Select
                    labelId="select-role"
                    id="demo-simple-select-outlined"
                    value={this.state.role}
                    fullWidth
                    name="role"
                    onChange={this.handleChange}
                    label="Rôle"
                  >
                    <MenuItem value={1} key={1}>
                      Membre
                    </MenuItem>
                    <MenuItem value={2} key={2}>
                      Moderateur
                    </MenuItem>
                    <MenuItem value={3} key={3}>
                      Admin
                    </MenuItem>
                  </Select>
                </FormControl>
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

ProfileRole.propTypes = {
  user_id: PropTypes.object.isRequired
};

export default connect(null, { editProfile, deleteUser, setMessage })(
  withStyles(styles)(ProfileRole)
);

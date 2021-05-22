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
import EditIcon from '@material-ui/icons/Edit';

import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    minWidth: 275,
    '& .MuiTextField-root': {
      margin: 8
    },
    marginTop: 20
  },
  editIconField: { fontSize: 13, cursor: 'pointer', marginRight: 5 }
});

class ProfileWorkDepartment extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      user_id: this.props.user_id,
      work_department: '',

      editable: false,
      form_valid: false,
      modal_open: false
    };
  }

  componentDidMount() {
    if (this.props.workDepartment) {
      this.setState({ work_department: this.props.workDepartment });
    }
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (userViewer.user_id === this.props.user_id) {
      this.setState({
        editable: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user_id !== this.props.user_id) {
      this.setState({ work_department: this.props.workDepartment });

      const userViewer = JSON.parse(localStorage.getItem('user'));
      if (userViewer.user_id === this.props.user_id.user_id) {
        this.setState({
          editable: true
        });
      }
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition du poste
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof ProfileWorkDepartment
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
   * @memberof ProfileWorkDepartment
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }
  /**
   * Soumission des changements du profile au backend hors image et image_cover
   *
   * @memberof Profile
   */
  async handleFormSubmit() {
    event.preventDefault();
    var datas = {
      work_department: this.state.work_department
    };
    this.props
      .editProfile(this.props.user_id, datas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Votre poste est mis à jour!'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileWorkDepartment
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
          variant="body2"
          color="textSecondary"
          onClick={this.handleClickOpen}
        >
          {this.state.editable === true && (
            <EditIcon
              className={classes.editIconField}
              onClick={this.handleClickOpen}
            />
          )}
          <b>Travail au Departement:</b> {this.state.work_department}
        </Typography>

        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Dans quel section travaillez vous?</DialogTitle>
          <form className={classes.root} onSubmit={this.handleFormSubmit}>
            <DialogContent>
              <TextField
                id="edit-work-department"
                defaultValue={this.props.workDepartment}
                label="Je travail dans le département"
                name="work_department"
                fullWidth
                className={classes.userModalEdit}
                onChange={this.handleChange}
                onBlur={this.handleChange}
                variant="outlined"
              >
                Je travaille dans le département
              </TextField>
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

ProfileWorkDepartment.propTypes = {
  user_id: PropTypes.number.isRequired
};

export default connect(null, { editProfile, deleteUser, setMessage })(
  withStyles(styles)(ProfileWorkDepartment)
);

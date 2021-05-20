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
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ReactTimeAgo from 'react-time-ago';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
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

class ProfileBirthDate extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      user_id: this.props.user_id,
      birth_date: '',

      editable: false,
      form_valid: false,
      modal_open: false
    };
  }

  componentDidMount() {
    if (this.props.birthDate) {
      this.setState({ birth_date: this.props.birthDate });
    }
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (userViewer.user_id === this.props.user_id) {
      this.setState({
        editable: true
      });
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition de la date de naissance
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof ProfileBirthDate
   */
  handleChange(e) {
    this.setState({
      birth_date: e
    });
  }

  /**
   * Ouvre un modal pour éditer le champ
   *
   * @memberof ProfileBirthDate
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }
  /**
   * Soumission des changements du profile au backend
   *
   * @memberof Profile
   */
  async handleFormSubmit() {
    event.preventDefault();
    var datas = {
      birth_date: this.state.birth_date
    };
    this.props
      .editProfile(this.props.user_id, datas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Votre date de naissance est mis à jour!'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Impossible de mettre à jour votre date de naissance!!',
          severity: 'error'
        });
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileBirthDate
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
        <Typography variant="body2" color="textSecondary">
          {this.state.editable === true && (
            <EditIcon
              className={classes.editIconField}
              onClick={this.handleClickOpen}
            />
          )}
          <b>Age: </b>
          {this.state.birth_date && (
            <ReactTimeAgo
              date={new Date(this.state.birth_date)}
              locale="fr-FR"
              verboseDate="date"
              timeStyle="mini"
            />
          )}
        </Typography>

        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Quel est votre date de naissance?</DialogTitle>
          <form className={classes.root} onSubmit={this.handleFormSubmit}>
            <DialogContent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  inputVariant="outlined"
                  name="birth_date"
                  format="dd/MM/yyyy"
                  autoOk
                  disableFuture
                  initialFocusedDate={this.props.birth_date}
                  margin="normal"
                  id="date-picker-inline"
                  label="Date Naissance"
                  value={this.state.birth_date}
                  onChange={this.handleChange}
                />
              </MuiPickersUtilsProvider>
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

ProfileBirthDate.propTypes = {
  user_id: PropTypes.number.isRequired
};

// export default connect(mapStateToProps, {
//   editProfile,
//   deleteUser,
//   setMessage
// })(withStyles(styles)(ProfileBirthDate));
export default connect(null, { editProfile, deleteUser, setMessage })(
  withStyles(styles)(ProfileBirthDate)
);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UserService from './../../services/user.service';
import { editProfile, deleteUser } from '../../actions/auth';
import { setMessage } from '../../actions/message';
import MyPosts from './../posts/post-my.component';
import Followed from './../follow/followed.component';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
  Snackbar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ReactTimeAgo from 'react-time-ago';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';

import UserImageField from './profile-fields/profile-field-image.component';
import WorkDepartment from './profile-fields/profile-field-workDepartment.component';

const styles = () => ({
  root: {
    minWidth: 275,
    '& .MuiTextField-root': {
      margin: 8
    },
    marginTop: 20
  },
  avatarWrapper: {
    position: 'relative'
  },
  avatar: {
    position: 'absolute',
    top: -80,
    right: 0,
    width: 140,
    height: 140,
    border: '5px solid #FFF'
  },
  avatarEdit: {
    position: 'absolute',
    top: 20,
    right: 0,
    zIndex: 3
  },
  media: {
    height: 0,
    paddingTop: '40.25%',
    position: 'relative'
  },
  imagePreview: {
    objectFit: 'cover',
    minHeight: 200,
    maxHeight: 400,
    textAlign: 'center',
    border: '1px solid #CCC'
  },
  imagePreviewImg: {
    maxWidth: '100%',
    maxHeight: 400
  },
  rightText: {
    textAlign: 'right'
  },
  username: {
    marginLeft: 15
  },
  deleteProfile: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    backgroundColor: '#fff'
  }
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Component permettant d'afficher le profil
 *
 * @class Profile
 * @extends {Component}
 */
class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.messageHandleClose = this.messageHandleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      user_id: null,
      name: '',
      last_name: '',
      email: '',
      work_department: '',
      bio: '',
      birth_date: new Date(),
      form_valid: false,
      modal_open: false
    };
  }

  /**
   * Appel getUserDatas pour charger les données du profile
   *
   * @memberof Profile
   */
  componentDidMount() {
    if (this.props.viewedUser) {
      this.setState(...this.props.viewedUser);
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition du profile
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof Profile
   */
  handleChange(e) {
    if (e.target) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    } else {
      this.setState({
        birth_date: e
      });
    }
  }

  /**
   * Soumission des changements du profile au backend hors image et image_cover
   *
   * @memberof Profile
   */
  async handleFormSubmit() {
    event.preventDefault();
    const user = this.state;
    var datas = {
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      birth_date: user.birth_date,
      work_department: user.work_department,
      bio: user.bio
    };

    this.props
      .editProfile(this.props.match.params.id, datas)
      .then(() => {
        this.handleClose();
        this.getUserDatas(this.props.match.params.id);
        this.setState({
          messageOpen: true,
          message: 'Profil mis à jour!'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Ouvre un modal pour editer les champs du profile
   *
   * @memberof Profile
   */
  handleClickOpen() {
    const user = this.state.currentUser;
    this.setState({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      work_department: user.work_department,
      bio: user.bio,
      birth_date: user.birth_date,
      modal_open: true
    });
  }

  /**
   * Ferme le modal
   *
   * @memberof Profile
   */
  handleClose() {
    this.setState({
      form_valid: false,
      modal_open: false
    });
  }

  /**
   * Ferme le message sous forme de chips
   *
   * @memberof Profile
   */
  messageHandleClose() {
    this.setState({
      messageOpen: false
    });
  }

  /**
   * Redu du component
   *
   * @return {*}
   * @memberof Profile
   */
  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;
    if (currentUser) {
      return (
        <Fragment>
          <CssBaseline />

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
                <div className={classes.grid}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="edit-name"
                        defaultValue={currentUser.name}
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
                        id="edit-email"
                        defaultValue={currentUser.email}
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="edit-last-name"
                        defaultValue={currentUser.last_name}
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
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          inputVariant="outlined"
                          name="birth_date"
                          format="dd/MM/yyyy"
                          autoOk
                          disableFuture
                          initialFocusedDate={currentUser.birth_date}
                          margin="normal"
                          id="date-picker-inline"
                          label="Date Naissance"
                          value={this.state.birth_date}
                          onChange={this.handleChange}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="edit-last-name"
                        defaultValue={currentUser.work_department}
                        label="Travail dans le département"
                        name="work_department"
                        fullWidth
                        className={classes.userModalEdit}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}
                        variant="outlined"
                      >
                        Je travaille dans le département
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="filled-multiline-flexible"
                        label="A Propos de moi"
                        multiline
                        fullWidth
                        rows={4}
                        rowsMax={8}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}
                        defaultValue={currentUser.bio}
                        name="bio"
                        className={classes.userModalEdit}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
    return (
      <Fragment>
        <div>
          <h3>Veuillez patienter</h3>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { editProfile, deleteUser, setMessage })(
  withStyles(styles)(ProfileEdit)
);

import React, { Component, Fragment } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserService from './../../services/user.service';
import { editProfile } from '../../actions/auth';
import MyPosts from './../posts/post-my.component';

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

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ReactTimeAgo from 'react-time-ago';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';

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
    paddingTop: '40.25%'
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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickOpenImageCover = this.handleClickOpenImageCover.bind(this);
    this.handleClickOpenImage = this.handleClickOpenImage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.messageHandleClose = this.messageHandleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.selectFileCover = this.selectFileCover.bind(this);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      currentUser: {
        user_id: null,
        name: '',
        last_name: '',
        email: '',
        work_department: '',
        bio: '',
        birth_date: new Date(),
        image: undefined,
        image_cover: undefined
      },
      image: undefined,
      image_cover: undefined,
      previewImage: undefined,
      previewImageCover: undefined,
      progress: 0,
      imageInfos: [],
      form_valid: false,
      modal_open: false,
      modal_image_open: false,
      modal_image_cover_open: false,
      messageOpen: false,
      message: ''
    };
  }

  /**
   * Charge les données du profile
   *
   * @param {*} userId
   * @memberof Profile
   */
  getUserDatas(userId) {
    UserService.getProfile(userId)
      .then((response) => {
        this.setState({
          currentUser: response.data
        });
      })
      .catch((error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      });
  }

  /**
   * Appel getUserDatas pour charger les données du profile
   *
   * @memberof Profile
   */
  componentDidMount() {
    this.getUserDatas(this.props.match.params.id);
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
   * Suit le champ image du profile lors du chargement d'un nouveau fichier
   *
   * @param {*} event
   * @memberof Profile
   */
  selectFile(event) {
    this.setState({
      image: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ''
    });
  }

  /**
   * Suit le champ image_cover du profile lors du chargement d'un nouveau fichier
   *
   * @param {*} event
   * @memberof Profile
   */
  selectFileCover(event) {
    this.setState({
      image_cover: event.target.files[0],
      previewImageCover: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ''
    });
  }

  /**
   * Soumission des changements du profile au backend hors image
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
   * Soumission des changement d'images au backend
   *
   * @return {*}
   * @memberof Profile
   */
  async handleImageSubmit() {
    event.preventDefault();
    const formDatas = new FormData();
    if (this.state.image) {
      formDatas.append('image', this.state.image);
    }

    return await UserService.updateProfileImage(
      this.props.match.params.id,
      formDatas
    )
      .then(() => {
        this.handleClose();
        this.getUserDatas(this.props.match.params.id);
        this.setState({
          messageOpen: true,
          message: 'Photo de profil mise à jour avec succès'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  handleClickOpenImage() {
    this.setState({
      modal_image_open: true
    });
  }

  handleClickOpenImageCover() {
    this.setState({
      modal_image_cover_open: true
    });
  }

  handleClose() {
    this.setState({
      form_valid: false,
      modal_open: false,
      modal_image_cover_open: false,
      modal_image_open: false
    });
  }

  messageHandleClose() {
    this.setState({
      messageOpen: false
    });
  }

  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;
    // if (!this.state) {
    //   return <Redirect to="/login" />;
    // }

    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.root}>
          <Grid item xs={8}>
            <Card>
              <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1524&q=80"
                title="Paella dish"
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.avatarWrapper}>
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    // src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    src={currentUser.image}
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={this.handleClickOpenImage}
                    className={classes.avatarEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
                <Typography variant="h4" component="h3">
                  {currentUser.name} {currentUser.last_name}
                </Typography>
                {currentUser.joined && (
                  <Typography variant="body2" component="p">
                    Inscrit{' '}
                    <ReactTimeAgo
                      date={new Date(currentUser.joined)}
                      locale="fr-FR"
                    />
                  </Typography>
                )}

                {currentUser.birth_date && (
                  <Typography variant="body2" color="textSecondary">
                    Age:{' '}
                    <ReactTimeAgo
                      date={new Date(currentUser.birth_date)}
                      locale="fr-FR"
                      verboseDate="date"
                      timeStyle="mini"
                    />
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  Travail au Departement : {currentUser.work_department}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Bio : {currentUser.bio}
                </Typography>
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="edit"
                  className={classes.editForm}
                  onClick={this.handleClickOpen}
                >
                  <EditIcon />
                </Fab>
              </CardContent>
            </Card>
            <MyPosts />
          </Grid>
          <Grid item xs={4}></Grid>
        </Container>

        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="md"
          open={this.state.modal_image_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Editer votre image de profil</DialogTitle>
          <form className={classes.root} onSubmit={this.handleImageSubmit}>
            <DialogContent>
              <div className={classes.grid}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Veuillez choisir une image de profile
                    </Typography>
                    <div className="mg20">
                      <label htmlFor="btn-upload">
                        <Input
                          id="btn-upload"
                          name="btn-upload"
                          style={{ display: 'none' }}
                          type="file"
                          accept="image/*"
                          onChange={this.selectFile}
                        />
                        <Button
                          className="btn-choose"
                          variant="outlined"
                          component="span"
                        >
                          Choisir une image
                        </Button>
                      </label>
                      <div className="file-name">
                        {this.state.image ? this.state.image.name : null}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className={classes.imagePreview}>
                      {this.state.previewImage && (
                        <img
                          className={classes.imagePreviewImg}
                          src={this.state.previewImage}
                          alt=""
                        />
                      )}
                    </div>
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.messageOpen}
          autoHideDuration={6000}
          onClose={this.messageHandleClose}
        >
          <Alert onClose={this.messageHandleClose} severity="success">
            {this.state.message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps, { editProfile })(
  withStyles(styles)(Profile)
);

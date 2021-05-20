import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UserService from '../../../services/user.service';
import { editProfile, deleteUser } from '../../../actions/auth';
import PropTypes from 'prop-types';

import { setMessage } from '../../../actions/message';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
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
  }
});

class ProfileAvatar extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      currentUser: {
        user_id: this.props.user_id,
        image: this.props.image
      },
      image: '',
      previewImage: undefined,
      imageInfos: [],

      editable: false,
      form_valid: false,
      modal_open: false
    };
  }

  componentDidMount() {
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (userViewer.user_id === this.props.user_id) {
      this.setState({
        editable: true
      });
    }
  }

  /**
   * Suit les changement de formulaire lors de l'édition du profile
   * pour les stocker dans le state
   *
   * @param {*} e
   * @memberof ProfileAvatar
   */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * Suit le champ image du profile lors du chargement d'un nouveau fichier
   *
   * @param {*} event
   * @memberof ProfileAvatar
   */
  selectFile(event) {
    this.setState({
      image: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0])
    });
  }

  /**
   * Ouvre un modal pour éditer l'avatar
   *
   * @memberof ProfileAvatar
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }

  /**
   * Soumission des changement de l'avatar au backend
   *
   * @return {*}
   * @memberof ProfileAvatar
   */
  async handleImageSubmit() {
    event.preventDefault();
    const formDatas = new FormData();
    if (this.state.image) {
      formDatas.append('image', this.state.image);
    }

    return await UserService.updateProfileImage(this.props.user_id, formDatas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Photo de profil mise à jour avec succès'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Impossible de mettre à jour la photo de profil!',
          severity: 'error'
        });
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileAvatar
   */
  handleClose() {
    this.setState({
      form_valid: false,
      modal_open: false
    });
  }

  render() {
    const { classes, image } = this.props;
    return (
      <Fragment>
        <div className={classes.avatarWrapper}>
          {this.state.currentUser.image ? (
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={image}
              alt={`${this.state.currentUser.name}-${this.state.currentUser.last_name}-avatar`}
            />
          ) : (
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              alt={`${this.state.currentUser.name}-${this.state.currentUser.last_name}-avatar`}
            />
          )}

          {this.state.editable === true && (
            <IconButton
              aria-label="edit"
              onClick={this.handleClickOpen}
              className={classes.avatarEdit}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>

        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Éditer votre image de profil</DialogTitle>
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

ProfileAvatar.propTypes = {
  user_id: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
  editProfile,
  deleteUser,
  setMessage
})(withStyles(styles)(ProfileAvatar));
// export default connect(null, { editProfile, deleteUser, setMessage })(
//   withStyles(styles)(ProfileAvatar)
// );

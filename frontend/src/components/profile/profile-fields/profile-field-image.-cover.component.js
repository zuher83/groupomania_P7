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

class ProfileImageCover extends Component {
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
        image_cover: this.props.image_cover
      },
      image_cover: '',
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
   * @memberof ProfileImageCover
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
   * @memberof ProfileImageCover
   */
  selectFile(event) {
    this.setState({
      image_cover: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0])
    });
  }

  /**
   * Ouvre un modal pour éditer l'image de couverture
   *
   * @memberof ProfileImageCover
   */
  handleClickOpen() {
    this.setState({
      modal_open: true
    });
  }

  /**
   * Soumission des changement de l'image de couverture au backend
   *
   * @return {*}
   * @memberof ProfileImageCover
   */
  async handleImageSubmit() {
    event.preventDefault();
    const formDatas = new FormData();
    if (this.state.image) {
      formDatas.append('image_cover', this.state.image);
    }

    return await UserService.updateProfileImage(this.props.user_id, formDatas)
      .then(() => {
        this.handleClose();
        this.props.setMessage({
          message: 'Photo de couverture mise à jour avec succès'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Impossible de mettre à jour la photo de couverture!',
          severity: 'error'
        });
      });
  }

  /**
   * Ferme le modal
   *
   * @memberof ProfileImageCover
   */
  handleClose() {
    this.setState({
      form_valid: false,
      modal_open: false
    });
  }

  render() {
    const { classes, imageCover } = this.props;
    return (
      <Fragment>
        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="md"
          open={this.state.modal_open}
          onClose={this.handleClose}
        >
          <DialogTitle>Éditer votre image de couverture</DialogTitle>
          <form className={classes.root} onSubmit={this.handleImageSubmit}>
            <DialogContent>
              <div className={classes.grid}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Veuillez choisir une image de couverture
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
                        {this.state.image_cover ? this.state.image_cover.name : null}
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

ProfileImageCover.propTypes = {
  user_id: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
  editProfile,
  deleteUser,
  setMessage
})(withStyles(styles)(ProfileImageCover));
// export default connect(null, { editProfile, deleteUser, setMessage })(
//   withStyles(styles)(ProfileImageCover)
// );

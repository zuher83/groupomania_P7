import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import { setMessage } from '../../actions/message';

// import CardActions from '@material-ui/core/CardActions';
import { Button, Card, CardContent, TextField, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 20,

    '& .MuiTextField-root': {
      margin: 5
    }
  },
  imagePreview: {
    maxHeight: 200,
    objectFit: 'cover',
    textAlign: 'center'
  },
  imagePreviewImg: {
    maxHeight: 200
  },
  sendPhoto: {
    marginRight: 15
  }
});

class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.savePost = this.savePost.bind(this);

    this.state = {
      post_id: null,
      title: '',
      content: '',
      image: undefined,

      imagePreview: undefined,
      submitted: false,
      title_form_valid: false,
      content_form_valid: false,
      valid_form: false,
      open: false,
      message: ''
    };
  }

  onChangeTitle(e) {
    if (e.target.value.length > 5) {
      this.setState({
        title: e.target.value,
        title_form_valid: true
      });
    } else {
      this.setState({
        title: e.target.value,
        title_form_valid: false
      });
    }
    this.checkFormValidy();
  }

  onChangeContent(e) {
    if (e.target.value.length > 5) {
      this.setState({
        content: e.target.value,
        content_form_valid: true
      });
    } else {
      this.setState({
        content: e.target.value,
        content_form_valid: false
      });
    }
    this.checkFormValidy();
  }

  checkFormValidy() {
    if (this.state.content_form_valid === true && this.state.title_form_valid) {
      this.setState({
        valid_form: true
      });
    }
  }

  selectFile(event) {
    this.setState({
      image: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0])
    });
    console.log(this.state);
  }

  savePost() {
    event.preventDefault();
    const formDatas = new FormData();
    formDatas.append('title', this.state.title);
    formDatas.append('content', this.state.content);
    if (this.state.image) {
      formDatas.append('image', this.state.image);
    }

    this.props
      .createPost(formDatas)
      .then(() => {
        this.handleReset();
        this.setState({
          ...this.state
        });
        this.props.setMessage({
          message: 'Félicitation votre message est publié!',
          severity: 'success'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message:
            'Un probléme est survenu lors de la publication de votre message!',
          severity: 'error'
        });
      });
  }

  handleReset() {
    this.setState({
      ...this.state,
      post_id: null,
      title: '',
      content: '',
      image: undefined,
      imagePreview: undefined,
      submitted: false,
      open: true
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Card className={classes.root} variant="outlined">
          <div className={classes.imagePreview}>
            {this.state.imagePreview && (
              <img
                className={classes.imagePreviewImg}
                src={this.state.imagePreview}
                alt=""
              />
            )}
          </div>
          <CardContent>
            <form autoComplete="off" onSubmit={this.savePost}>
              <TextField
                onChange={this.onChangeTitle}
                onBlur={this.onChangeTitle}
                name="title"
                label="Titre"
                value={this.state.title}
                fullWidth
                autoComplete="none"
              />
              <TextField
                onChange={this.onChangeContent}
                onBlur={this.onChangeContent}
                name="content"
                label="Message"
                value={this.state.content}
                fullWidth
                multiline
                rows={6}
                autoComplete="none"
              />
              <label htmlFor="image" className={classes.sendPhoto}>
                <Input
                  id="image"
                  name="image"
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={this.selectFile}
                />
                <Button
                  className="btn-choose"
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<InsertPhotoIcon />}
                >
                  Insérer une image
                </Button>
              </label>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                disabled={!this.state.valid_form === true}
                startIcon={<SendIcon />}
              >
                Poster
              </Button>
            </form>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default connect(null, { createPost, setMessage })(
  withStyles(styles)(AddNewPost)
);

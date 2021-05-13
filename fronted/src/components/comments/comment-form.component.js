import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/post';

import { Button, Snackbar, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Formulaire d'ajout de commentaire
 *
 * @class AddNewComment
 * @extends {Component}
 */
class AddNewComment extends Component {
  constructor(props) {
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.commentPost = this.commentPost.bind(this);

    this.state = {
      comment: '',
      post_id: '',
      comment_form_valid: false,
      open: false,
      message: ''
    };
  }

  /**
   * Onchange du champ comment pour modifier le state au fur
   * et à mesure de la saisie
   *
   * @param {*} e
   * @memberof AddNewComment
   */
  onChangeComment(e) {
    if (e.target.value.length > 1) {
      this.setState({
        comment: e.target.value,
        comment_form_valid: true
      });
    } else {
      this.setState({
        comment: e.target.value,
        comment_form_valid: false
      });
    }
  }

  /**
   * Envoi le formulaire de commentaire au backend
   *
   * @memberof AddNewComment
   */
  commentPost() {
    event.preventDefault();
    const datas = {
      comment: this.state.comment,
      post_id: this.props.post
    };
    this.props
      .createComment(datas)
      .then(() => {
        this.handleReset();
        this.setState({
          ...this.state,
          open: true,
          message: 'Félicitation votre commentaire est publié!'
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Remet à zero le formullaire après soumission
   *
   * @memberof AddNewComment
   */
  handleReset() {
    this.setState({
      ...this.state,
      comment: '',
      open: true
    });
  }

  /**
   * Rendu du component
   *
   * @return {*} formulaire
   * @memberof AddNewComment
   */
  render() {
    const handleClose = () => {
      this.setState({ ...this.state, open: false });
    };

    return (
      <Fragment>
        <form autoComplete="off" onSubmit={this.commentPost}>
          <TextField
            onChange={this.onChangeComment}
            onBlur={this.onChangeComment}
            name="comment"
            label="Commentaire"
            value={this.state.comment}
            fullWidth
            multiline
            variant="outlined"
            rowsMax={6}
            autoComplete="none"
          />
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!this.state.comment_form_valid === true}
            startIcon={<SendIcon />}
          >
            Poster
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {this.state.message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

export default connect(null, { createComment })(AddNewComment);

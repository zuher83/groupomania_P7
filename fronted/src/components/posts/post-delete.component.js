import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
// import Message from '../../components/message.component';
import { setMessage } from '../../actions/message';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/**
 * Component permettant d'afficher un post dans une liste de posts
 *
 * @class DeletePostComponent
 * @extends {Component}
 */
class DeletePostComponent extends Component {
  constructor(props) {
    super(props);
    this.deleteCurrentPost = this.deleteCurrentPost.bind(this);

    this.state = {
      message: '',
      severity: 'success'
    };
  }

  /**
   * Supprime le post courant
   *
   * @memberof DeletePostComponent
   */
  deleteCurrentPost() {
    console.log(this.props);

    const currentPost = this.props.post_id;

    this.props
      .deletePost(currentPost)
      .then(() => {
        this.props.setMessage({
          message: 'Le post à été supprimé avec succés!',
          severity: 'success'
        });
      })
      .catch(() => {
        this.props.setMessage({
          message: 'Le post ne peut pas être supprimé!',
          severity: 'error'
        });
      });
  }

  /**
   * Rendu du component
   *
   * @return {*}
   * @memberof DeletePostComponent
   */
  render() {
    return (
      <Fragment>
        <IconButton aria-label="settings" onClick={this.deleteCurrentPost}>
          <DeleteForeverIcon />
        </IconButton>
      </Fragment>
    );
  }
}

export default connect(null, { deletePost, setMessage })(DeletePostComponent);

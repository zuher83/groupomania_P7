import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { countComments, createComment } from '../../actions/comment';

/**
 * Affiche une liste des commentaires sur chaque post
 * Component à appeler avec une prop postId
 *
 * @class CommentsCount
 * @extends {Component}
 */
class CommentsCount extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { comments_count: '' };
  }

  /**
   * Chargement du component
   *
   * @memberof CommentsCount
   */
  componentDidMount() {
    this._isMounted = true;

    this.props
      .countComments(this.props.post)
      .then((com) => {
        if (this._isMounted) {
          if (com.length > 0) {
            this.setState({ ...this.state, comments_count: com });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Rendu du component
   *
   * @return {*}
   * @memberof CommentsCount
   */
  render() {
    if (this.state.comments_count) {
      return <Fragment>{this.state.comments_count.length}</Fragment>;
    }
    return '0';
  }
}

export default connect(null, {
  countComments,
  createComment
})(CommentsCount);

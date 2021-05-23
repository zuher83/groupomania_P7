import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { retrieveComments } from '../../actions/comment';
import ContentService from '../../services/content.service';

/**
 * Affiche une liste des commentaires sur chaque post
 * Component à appeler avec une prop post
 *
 * @class CommentsCount
 * @extends {Component}
 */
class CommentsCount extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.countComment = this.countComment.bind(this);

    this.state = { commentList: [], count_comment: 0 };
  }

  /**
   * Chargement du component
   *
   * @memberof CommentsCount
   */
  componentDidMount() {
    this._isMounted = true;

    this.countComment(this.props.post);
  }

  countComment(post) {
    ContentService.countComments(post)
      .then((result) => {
        if (this._isMounted) {
          this.setState({ count_comment: result.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.commentList !== this.props.commentList) {
      this.countComment(this.props.post);
    }
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
    if (this.state.count_comment !== 0) {
      return (
        <Fragment key={this.props.post}>{this.state.count_comment}</Fragment>
      );
    } else {
      return <Fragment key={this.props.post}>0</Fragment>;
    }
  }
}

const mapStateToProps = (state) => ({
  commentList: state.comment
});

CommentsCount.propTypes = {
  post: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { retrieveComments })(CommentsCount);

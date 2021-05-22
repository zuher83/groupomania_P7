import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { retrieveComments } from '../../actions/comment';

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
    this.state = { commentList: [] };
  }

  /**
   * Chargement du component
   *
   * @memberof CommentsCount
   */
  componentDidMount() {
    this._isMounted = true;

    if (this.props.post) {
      this.props
        .retrieveComments(this.props.post)
        .then((result) => {
          if (this._isMounted) {
            this.setState({ commentList: result });
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
    return (
      <Fragment key={this.props.post}>{this.state.commentList.length}</Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   const { comment } = state.comment;
//   return {
//     comment_count: comment
//   };
// }
const mapStateToProps = (state) => ({
  commentList: state.comment
});

CommentsCount.propTypes = {
  post: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { retrieveComments })(CommentsCount);
// export default connect(null, { countComments })(CommentsCount);

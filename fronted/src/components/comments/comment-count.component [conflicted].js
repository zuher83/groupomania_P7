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
    this.state = {};
  }

  /**
   * Chargement du component
   *
   * @memberof CommentsCount
   */
  componentDidMount() {
    this._isMounted = true;

    this.props
      .retrieveComments(this.props.post)
      .then((result) => {
        if (this._isMounted) {
          if (result.length > 0) {
            this.setState( {comment: result} );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
    console.log(prevState);
    if (prevState.comment !== this.props.comment_count) {
      // let actual = this.state.comment;
      // actual.push(this.props.comment);
      console.log(this.props.comment_count);

      // this.setState({comment_count: this.props.comment_count});
    }

    // if (prevProps.comment !== this.props.comment) {
    //   if (this.props.post === prevProps.post) {
    //     console.log(this.props);
    //     this.setState({
    //       comment: this.props.comment
    //     });
    //   }
    // }
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
    const { comment } = this.props;

    console.log(comment);
    if (comment) {
      return <Fragment>{comment.length}</Fragment>;
    }
    return '0';
  }
}

// function mapStateToProps(state) {
//   const { comment } = state.comment;
//   return {
//     comment_count: comment
//   };
// }
const mapStateToProps = (state) => ({
  comment: state.comment
  // comment: state.comment
});

CommentsCount.propTypes = {
  post: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { retrieveComments })(CommentsCount);
// export default connect(null, { countComments })(CommentsCount);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { retrieveComments } from '../../actions/comment';
import CommentComponent from './comment.component';

/**
 * Affiche une liste des commentaires sur chaque post
 * Component à appeler avec une prop postId
 *
 * @class CommentsList
 * @extends {Component}
 */
class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  /**
   * Chargement du component
   *
   * @memberof CommentsList
   */
  componentDidMount() {
    this.props
      .retrieveComments(this.props.post)
      .then((com) => {
        this.setState({ comment: com });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Rendu du component
   *
   * @return {*}
   * @memberof CommentsList
   */
  render() {
    const { comment } = this.props;
    return (
      <Fragment>
        <div>
          {comment &&
            comment
              .reverse()
              .map((res) => (
                <CommentComponent
                  key={res.comment_id}
                  commentId={res.comment_id}
                />
              ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  comment: state.comment
});

export default connect(mapStateToProps, {
  retrieveComments
})(CommentsList);

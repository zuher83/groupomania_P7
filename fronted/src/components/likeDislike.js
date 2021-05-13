import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getLikes, likeUnlike } from './../actions/post';

import IconButton from '@material-ui/core/IconButton';

import { Favorite } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  like: {
    color: 'red'
  },
  likeUnlike: {
    marginRight: 20
  }
});

class LikeUnlike extends Component {
  constructor(props) {
    super(props);
    this.likeUnlike = this.likeUnlike.bind(this);

    this.state = {
      post_id: '',
      user_id: '',
      likeUnlike: 0,
      countLikes: null,
      expanded: false
    };
  }

  componentDidMount() {
    if (this.props.postId) {
      this.getLikes(this.props.postId);
    }
  }

  getLikes(postId) {
    this.props
      .getLikes(postId)
      .then((response) => {
        this.setState({
          countLikes: response.countVals + ' like(s)',
          likeUnlike: response.userLiked
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  likeUnlike() {
    const postId = { post: this.props.postId };
    const state = this.state.likeUnlike;

    this.props
      .likeUnlike(postId, state)
      .then((response) => {
        this.setState({
          countLikes: response.countVals + ' like(s)',
          likeUnlike: response.userLiked
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.likeUnlike}>
          <IconButton aria-label="add to favorites" onClick={this.likeUnlike}>
            {this.state.likeUnlike === 1 ? (
              <Favorite className={classes.like} />
            ) : (
              <Favorite />
            )}
          </IconButton>
          <Typography variant="overline">{this.state.countLikes}</Typography>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  likeUnlike: state.likeUnlike
});

export default connect(mapStateToProps, {
  getLikes,
  likeUnlike
})(withStyles(styles)(LikeUnlike));

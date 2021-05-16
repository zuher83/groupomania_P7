import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFollowed, followUnfollow } from './../../actions/follow';

import { IconButton, Tooltip } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
  like: {
    color: 'red'
  },
  followButton: {
    marginRight: 20
  }
});

class FollowUnfollow extends Component {
  constructor(props) {
    super(props);
    this.followUnfollow = this.followUnfollow.bind(this);

    this.state = {
      user_id: '',
      userFallow: 0,
      expanded: false
    };
  }

  componentDidMount() {
    if (this.props.userId) {
      this.getFollow(this.props.userId);
    }
  }

  getFollow(userId) {
    this.props
      .getFollowed(userId)
      .then((response) => {
        this.setState({
          userFallow: response.userFallow
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  followUnfollow() {
    const userId = this.props.userId;
    const state = this.state.userFallow;

    this.props
      .followUnfollow(userId, state)
      .then((response) => {
        this.setState({
          userFallow: response
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
        {this.state.userFallow === 1 ? (
          <div className={classes.followButton}>
            <Tooltip title="Arrêter de suivre">
              <IconButton
                aria-label="del to favorites"
                onClick={this.followUnfollow}
              >
                <RemoveCircleIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div className={classes.followButton}>
            <Tooltip title="Commencer à suivre">
              <IconButton
                aria-label="del to favorites"
                onClick={this.followUnfollow}
              >
                <PersonAddIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userFallow: state.userFallow
});

export default connect(mapStateToProps, {
  getFollowed,
  followUnfollow
})(withStyles(styles)(FollowUnfollow));

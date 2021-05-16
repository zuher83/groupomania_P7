import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

import ContentService from '../../services/content.service';
import UserService from '../../services/user.service';

const styles = () => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,

    '& .MuiTextField-root': {
      margin: 5
    }
  },
  avatar: {
    backgroundColor: red[500]
  },
  username: {
    marginLeft: 15
  }
});

class OneComment extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentComment: {
        comment_id: '',
        comment: '',
        user_id: '',
        create_date: ''
      },
      author_name: '',
      author_image: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getComment(this.props.commentId);
  }

  getComment(commentId) {
    ContentService.oneComment(commentId)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            currentComment: response.data
          });
          this.getUser(response.data.user_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getUser(userId) {
    UserService.getProfile(userId)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            author_name: response.data.name + ' ' + response.data.last_name,
            author_image: response.data.image
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    let dateCreate = '';
    if (this.state.currentComment.create_date) {
      dateCreate = (
        <div>
          <ReactTimeAgo
            date={new Date(this.state.currentComment.create_date)}
            locale="fr-FR"
            verbose="date"
          />
          <span> par {this.state.author_name}</span>
        </div>
      );
    }
    return (
      <Fragment>
        <Card
          className={classes.root}
          key={this.state.currentComment.comment_id}
          variant="outlined"
        >
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={this.state.author_image}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            // title={this.state.currentComment.title}
            subheader={dateCreate}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.username}
          ></Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.currentComment.comment}
            </Typography>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default connect(null, {})(withStyles(styles)(OneComment));

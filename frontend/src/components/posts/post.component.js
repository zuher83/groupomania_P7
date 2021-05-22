import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ContentService from '../../services/content.service';
import UserService from '../../services/user.service';
import LikeUnlike from './../likeDislike';
import CommentForm from './../comments/comment-form.component';
import CommentList from './../comments/comment-list.component';
import CommentCount from './../comments/comment-count.component';
import PostDeleteComponent from './post-delete.component';

import clsx from 'clsx';
import ReactTimeAgo from 'react-time-ago';

import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Typography
} from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StarsIcon from '@material-ui/icons/Stars';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 20,

    '& .MuiTextField-root': {
      margin: 5
    }
  },
  avatar: {
    backgroundColor: red[500]
  },
  username: {
    marginLeft: 15
  },
  notFollowedAuthor: {
    // backgroundColor: 'red'
  },
  followedAuthor: {
    borderTop: '4px solid red'
  }
});

/**
 * Component permettant d'afficher un post dans une liste de posts
 *
 * @class OnePost
 * @extends {Component}
 */
class OnePost extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.deleteCurrentPost = this.deleteCurrentPost.bind(this);

    this.state = {
      currentPost: {
        post_id: '',
        title: '',
        content: '',
        author: '',
        post_created: '',
        image: null
      },
      author_name: '',
      author_image: '',
      author_id: '',
      currentIndex: -1,
      expanded: false,
      userFollow: 0,
      currentUserRole: 'ROLE_USER',
      currentUserId: ''
    };
  }

  /**
   * On charge le post et vérifie le role de l'utilisateur actuel
   *
   * @memberof OnePost
   */
  componentDidMount() {
    this._isMounted = true;

    this.getPost(this.props.post_id);
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      currentUserRole: user.roles[0],
      currentUserId: user.user_id
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Charge un post unique pour la liste
   *
   * @param {*} postId
   * @memberof OnePost
   */
  getPost(postId) {
    ContentService.onePost(postId)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            currentPost: response.data
          });
        }

        this.getUser(response.data.author);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Va chercher les données de l'auteur
   *
   * @param {*} userId
   * @memberof OnePost
   */
  getUser(userId) {
    UserService.getProfile(userId)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            author_name: response.data.name + ' ' + response.data.last_name,
            author_image: response.data.image,
            author_id: response.data.user_id
          });
          this.checkIfAuthorFollow(response.data.user_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCurrentPost() {
    const currentPost = this.state.currentPost.post_id;

    this.props
      .deletePost(currentPost)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkIfAuthorFollow(userId) {
    UserService.FollowUnfollowGet(userId)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            userFollow: response.data.userFollow
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Permet d'ouvrir la liste des commentaire en dessous du post
   *
   * @memberof OnePost
   */
  handleExpandClick() {
    this.setState({
      expanded: true
    });
  }

  /**
   * Rendu du component
   *
   * @return {*}
   * @memberof OnePost
   */
  render() {
    const { classes } = this.props;
    let dateCreate = '';
    let deleteButton;
    if (this.state.currentPost.post_created) {
      dateCreate = (
        <div>
          <ReactTimeAgo
            date={new Date(this.state.currentPost.post_created)}
            locale="fr-FR"
            verbose="date"
          />
          <span> par {this.state.author_name}</span>
        </div>
      );
    }

    if (
      this.state.currentUserRole === 'ROLE_ADMIN' ||
      this.state.currentUserRole === 'ROLE_MODERATOR' ||
      this.state.currentUserId === this.state.author_id
    ) {
      deleteButton = (
        <PostDeleteComponent post_id={this.state.currentPost.post_id} />
      );
    }

    let count_comments;
    if (this.state.currentPost.post_id) {
      count_comments = (
        <CommentCount
          post={this.state.currentPost.post_id}
          key={this.state.currentPost.post_id}
        />
      );
    }

    const followedIcon = (
      <span>
        <StarsIcon style={{ color: red[900] }} /> {this.state.currentPost.title}
      </span>
    );

    return (
      <Fragment>
        <Card
          className={classes.root}
          key={this.state.currentPost.post_id}
          variant="outlined"
        >
          {this.state.userFollow === 1 ? (
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={this.state.author_image}
                  alt={`${this.state.currentPost.title}-user`}
                />
              }
              action={deleteButton}
              title={followedIcon}
              subheader={dateCreate}
              className={classes.followedAuthor}
            />
          ) : (
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={this.state.author_image}
                  alt={`${this.state.currentPost.title}-user`}
                />
              }
              action={deleteButton}
              title={this.state.currentPost.title}
              subheader={dateCreate}
              className={classes.notFollowedAuthor}
            />
          )}

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.username}
          ></Typography>
          {this.state.currentPost.image && (
            <CardMedia
              className={classes.media}
              image={this.state.currentPost.image}
              title={`${this.state.currentPost.title}-media`}
              alt={`${this.state.currentPost.title}-mediaAlt`}
              component="img"
            />
          )}

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.currentPost.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <LikeUnlike postId={this.state.currentPost.post_id} />

            <Badge
              color="primary"
              badgeContent={count_comments}
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              showZero
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              <QuestionAnswerIcon />
            </Badge>
            <Typography variant="overline">Commentaires</Typography>
          </CardActions>

          <CardContent>
            <CommentForm post={this.state.currentPost.post_id} />
          </CardContent>
          <Collapse
            in={this.state.expanded}
            timeout="auto"
            collapsedHeight="50"
            unmountOnExit
          >
            <CardContent>
              <CommentList post={this.state.currentPost.post_id} />
            </CardContent>
          </Collapse>
        </Card>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps, {})(withStyles(styles)(OnePost));

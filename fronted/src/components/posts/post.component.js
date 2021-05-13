import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ContentService from '../../services/content.service';
import UserService from '../../services/user.service';
import LikeUnlike from './../likeDislike';
import CommentForm from './../comments/comment-form.component';
import CommentList from './../comments/comment-list.component';

// import { Link } from 'react-router-dom';
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
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
  }
});

/**
 * Component permettant d'afficher un post dans une liste de posts
 *
 * @class OnePost
 * @extends {Component}
 */
class OnePost extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);

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
      count_comments: 0,
      currentIndex: -1,
      expanded: false,
      currentUserRole: 'ROLE_USER'
    };
  }

  /**
   * On charge le post et vérifie le role de l'utilisateur actuel
   *
   * @memberof OnePost
   */
  componentDidMount() {
    this.getPost(this.props.postId);
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ currentUserRole: user.roles[0] });
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
        this.setState({
          currentPost: response.data
        });
        this.getUser(response.data.author);
        this.countComments(postId);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Ov chercher les données de l'auteur
   *
   * @param {*} userId
   * @memberof OnePost
   */
  getUser(userId) {
    UserService.getProfile(userId)
      .then((response) => {
        this.setState({
          author_name: response.data.name + ' ' + response.data.last_name,
          author_image: response.data.image
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * On compte les commentaires
   *
   * @param {*} postId
   * @memberof OnePost
   */
  countComments(postId) {
    ContentService.allComments(postId)
      .then((response) => {
        this.setState({
          count_comments: response.data.length
        });
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

    if (this.state.currentUserRole === 'ROLE_ADMIN') {
      deleteButton = (
        <IconButton aria-label="settings">
          <DeleteForeverIcon />
        </IconButton>
      );
    }

    return (
      <Fragment>
        <Card
          className={classes.root}
          key={this.state.currentPost.post_id}
          variant="outlined"
        >
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={this.state.author_image}
              />
            }
            action={deleteButton}
            title={this.state.currentPost.title}
            subheader={dateCreate}
          />
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
              title="Paella dish"
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
              color="secondary"
              badgeContent={this.state.count_comments}
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

export default connect(null, {})(withStyles(styles)(OnePost));

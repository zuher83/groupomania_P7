import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getFollowed,
  followUnfollow,
  getUserFollowed
} from '../../actions/follow';

import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar
} from '@material-ui/core';
import Follow from './../follow/follow.component';

import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = () => ({
  like: {
    color: 'red'
  },
  followButton: {
    marginRight: 20
  },
  title: {
    padding: 20
  }
});

/**
 * Les profils suivi par l'utilisateur affiché
 *
 * @class FollowedUsers
 * @extends {Component}
 */
class FollowedUsers extends Component {
  constructor(props) {
    super(props);
    this.followUnfollow = this.followUnfollow.bind(this);

    this.state = {
      user_id: '',
      followed: [],
      userFallow: 0,
      expanded: false
    };
  }

  /**
   * Appel getFollow pour charger les membres suivi
   *
   * @memberof FollowedUsers
   */
  componentDidMount() {
    if (this.props.userId) {
      this.getFollow(this.props.userId);
    }
  }

  /**
   * Appel getFollow pour mettre à jour les données des membres suivis
   * en cas de changement du props userId depuis le parent
   *
   * @memberof FollowedUsers
   */
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getFollow(this.props.userId);
    }
  }

  /**
   * Charge les utilisateur suivi par le profil vu en cours
   *
   * @param {*} userId
   * @memberof FollowedUsers
   */
  getFollow(userId) {
    this.props
      .getUserFollowed(userId)
      .then((response) => {
        this.setState({ followed: response });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Permet de suivre ou d'arrêter de suivre un membre
   *
   * @memberof FollowedUsers
   */
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

  /**
   * Rendu du component
   *
   * @return {*}
   * @memberof FollowedUsers
   */
  render() {
    const { classes } = this.props;
    const profile = this.state.followed;
    return (
      <Fragment>
        <Card>
          <Typography variant="h6" className={classes.title}>
            Personnes Suivi
          </Typography>
          <Divider component="div" />
          <List className={classes.root}>
            {profile.length > 0 &&
              profile.reverse().map((res) => (
                <ListItem key={res.user_id}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar} src={res.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${res.name} ${res.last_name}`}
                    secondary={res.work_department}
                  />
                  <ListItemSecondaryAction>
                    <Follow userId={res.user_id} />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            {profile.length === 0 && (
              <ListItem>
                <Typography component="h6">Aucune personne suivie.</Typography>
              </ListItem>
            )}
          </List>
        </Card>
      </Fragment>
    );
  }
}

export default connect(null, {
  getFollowed,
  followUnfollow,
  getUserFollowed
})(withStyles(styles)(FollowedUsers));

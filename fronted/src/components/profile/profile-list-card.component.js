// import 'date-fns';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import 'date-fns';
import { withStyles } from '@material-ui/styles';
import Follow from './../follow/follow.component';
import { red } from '@material-ui/core/colors';

/**
 * Définition des classes à utiliser
 *
 */
const styles = () => ({
  root: {
    minWidth: '100%',
    marginTop: 20,
    // marginBottom: 10,
    height: 270,

    '& .MuiTextField-root': {
      margin: 5
    }
  },

  header: {
    height: 100,
    background: '#e9e9e9',
    position: 'relative'
  },
  content: {
    position: 'relative',
    display: 'flex',
    minHeight: 80
  },
  avatar: {
    top: 10,
    left: '30%',
    height: 100,
    width: 100,
    border: `5px solid #fff`,
    background: '#e9e9e9'
  },
  link: {
    textDecoration: 'none',
    color: red[600]
  }
});
/**
 * Card de l'utilisateur courant
 *
 * @class MyProfileCard
 * @extends {Component}
 */
class ListProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = { userViewedProfile: '' };
  }

  /**
   * Appel des valeurs du profile pour les insérer dans le state
   *
   * @memberof MyProfileCard
   */
  getUserDatas(userId) {
    this.props
      .getProfile(userId)
      .then((response) => {
        this.setState({
          userViewedProfile: response.data
        });
      })
      .catch((error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      });
  }

  /**
   * Rendu pour le navigateur
   *
   * @return {*} Une Card avec champs du profile
   * @memberof MyProfileCard
   */
  render() {
    const { viewedUserDatas, classes } = this.props;
    const profile = viewedUserDatas;
    return (
      <>
        {profile === null || this.state.loading ? (
          <div>
            <Skeleton variant="text" />
            <Skeleton
              animation="wave"
              variant="circle"
              width={60}
              height={60}
            />
            <Skeleton variant="rect" width={'100%'} height={118} />
          </div>
        ) : (
          <Fragment key={profile.user_id}>
            <Card
              className={classes.root}
              key={profile.user_id}
              variant="outlined"
            >
              <div className={classes.header}>
                <Link to={`/user/${profile.user_id}`} color="inherit">
                  <Avatar className={classes.avatar} src={profile.image} />
                </Link>
              </div>
              <CardContent className={classes.content}>
                <div className={classes.userFields}>
                  <Typography variant="h6">
                    <Link
                      to={`/user/${profile.user_id}`}
                      className={classes.link}
                      color="primary"
                    >
                      {profile.name} {profile.last_name}
                    </Link>
                  </Typography>
                  {profile.birth_date && (
                    <Typography variant="body2" color="textSecondary">
                      <b>Age:</b>{' '}
                      <ReactTimeAgo
                        date={new Date(profile.birth_date)}
                        locale="fr-FR"
                        verboseDate="date"
                        timeStyle="mini"
                      />
                    </Typography>
                  )}

                  <Typography variant="body2" color="textSecondary">
                    <b>Poste:</b> {profile.work_department}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Follow userId={profile.user_id} />
              </CardActions>
            </Card>
          </Fragment>
        )}
      </>
    );
  }
}

export default connect(null, {})(withStyles(styles)(ListProfileCard));

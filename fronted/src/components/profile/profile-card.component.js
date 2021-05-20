// import 'date-fns';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import 'date-fns';
import { withStyles } from '@material-ui/styles';
import { currentProfile } from './../../actions/auth';
import { red } from '@material-ui/core/colors';

/**
 * Définition des classes à utiliser
 *
 */
const styles = () => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 20,

    '& .MuiTextField-root': {
      margin: 5
    }
  },

  header: {
    height: 100,
    background: '#e9e9e9'
  },
  content: {
    position: 'relative',
    display: 'flex'
  },
  avatar: {
    position: 'absolute',
    top: -45,
    right: 16,
    height: 90,
    width: 90,
    border: `5px solid #fff`,
    background: '#e9e9e9'
  },
  link: {
    textDecoration: 'none',
    color: red[900]
  }
});
/**
 * Card de l'utilisateur courant
 *
 * @class MyProfileCard
 * @extends {Component}
 */
class MyProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Appel des valeurs du profile pour les insérer dans le state
   *
   * @memberof MyProfileCard
   */
  getUserDatas() {
    this.props
      .currentProfile()
      .then((response) => {
        this.setState({
          profiles: {
            profile: response.data
          }
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
   * Chargement du profile
   *
   * @memberof MyProfileCard
   */
  componentDidMount() {
    this.getUserDatas();
  }

  /**
   * Rendu pour le navigateur
   *
   * @return {*} Une Card avec champs du profile
   * @memberof MyProfileCard
   */
  render() {
    const { profile, classes } = this.props;
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
              <div className={classes.header} />
              <CardContent className={classes.content}>
                <Link to={'/me'} color="inherit">
                  <Avatar
                    className={classes.avatar}
                    src={profile.image}
                    alt={profile.name}
                  />
                </Link>

                <div className={classes.userFields}>
                  <Typography variant="h6">
                    <Link
                      to={`/user/${profile.user_id}`}
                      className={classes.link}
                      color="secondary"
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
                  {profile.joined && (
                    <Typography variant="body2" color="textSecondary">
                      <b>Inscrit</b>{' '}
                      <ReactTimeAgo
                        date={new Date(profile.joined)}
                        locale="fr-FR"
                      />
                    </Typography>
                  )}

                  <Typography variant="body2" color="textSecondary">
                    <b>Departement:</b> {profile.work_department}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <b>Le petit mot:</b> {profile.bio}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Fragment>
        )}
      </>
    );
  }
}

/**
 * Mappage du state avec props
 *
 * @param {*} state
 * @return {*}
 */
function mapStateToProps(state) {
  const { user } = state.auth;
  const { profile } = state.profiles;
  return {
    user,
    profile
  };
}

export default connect(mapStateToProps, { currentProfile })(
  withStyles(styles)(MyProfileCard)
);

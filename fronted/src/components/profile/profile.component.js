import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UserService from './../../services/user.service';
import { editProfile, deleteUser } from '../../actions/auth';
import MyPosts from './../posts/post-my.component';
import Followed from './../follow/followed.component';

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import 'date-fns';
import ReactTimeAgo from 'react-time-ago';
import { withStyles } from '@material-ui/styles';

import UserImageField from './profile-fields/profile-field-image.component';
import WorkDepartment from './profile-fields/profile-field-workDepartment.component';
import Bio from './profile-fields/profile-field-bio.component';
import BirthDate from './profile-fields/profile-field-birth-date.component';
import GeneralSettings from './profile-fields/profile-field-other.component';
import RoleAttribute from './profile-fields/profile-field-role.component';
import DeleteProfile from './profile-fields/profile-delete.component';

const styles = () => ({
  root: {
    minWidth: 275,
    '& .MuiTextField-root': {
      margin: 8
    },
    marginTop: 20
  },
  avatarWrapper: {
    position: 'relative'
  },
  avatar: {
    position: 'absolute',
    top: -80,
    right: 0,
    width: 140,
    height: 140,
    border: '5px solid #FFF'
  },
  media: {
    height: 0,
    paddingTop: '40.25%',
    position: 'relative'
  },
  rightText: {
    textAlign: 'right'
  }
});

/**
 * Component permettant d'afficher le profil
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        user_id: null,
        name: '',
        last_name: '',
        email: '',
        work_department: '',
        bio: '',
        birth_date: '',
        image: '',
        image_cover: undefined
      },
      form_valid: false
    };
  }

  /**
   * Appel getUserDatas pour charger les données du profile
   *
   * @memberof Profile
   */
  componentDidMount() {
    this.getUserDatas(this.props.match.params.id);
  }

  /**
   * Charge les données du profile
   *
   * @param {*} userId
   * @memberof Profile
   */
  getUserDatas(userId) {
    UserService.getProfile(userId)
      .then((response) => {
        this.setState({
          currentUser: response.data
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
   * Rendu du component
   *
   * @return {*}
   * @memberof Profile
   */
  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;
    if (currentUser.user_id) {
      return (
        <Fragment>
          <CssBaseline />
          <Container maxWidth="md" className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1524&q=80"
                    title="Cover Image"
                  >
                    <div>
                      <DeleteProfile user_id={currentUser} />
                      <RoleAttribute user_id={currentUser} />
                    </div>
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <UserImageField
                      user_id={currentUser.user_id}
                      image={currentUser.image}
                    />
                    <GeneralSettings user_id={currentUser} />
                    {currentUser.joined && (
                      <Typography variant="body2" component="p">
                        Inscrit{' '}
                        <ReactTimeAgo
                          date={new Date(currentUser.joined)}
                          locale="fr-FR"
                        />
                      </Typography>
                    )}

                    <BirthDate
                      birthDate={currentUser.birth_date}
                      user_id={currentUser.user_id}
                    />
                    <WorkDepartment
                      workDepartment={currentUser.work_department}
                      user_id={currentUser.user_id}
                    />
                    <Bio bio={currentUser.bio} user_id={currentUser.user_id} />
                  </CardContent>
                </Card>
                <MyPosts userId={this.props.match.params.id} />
              </Grid>
              <Grid item xs={4}>
                {currentUser.user_id && (
                  <Followed userId={currentUser.user_id} />
                )}
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Skeleton variant="text" />
              <Skeleton variant="rect" width={'100%'} height={118} />
              <Skeleton
                animation="wave"
                variant="circle"
                width={60}
                height={60}
              />
            </Grid>
          </Grid>
        </Container>
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

export default connect(mapStateToProps, { editProfile, deleteUser })(
  withStyles(styles)(Profile)
);

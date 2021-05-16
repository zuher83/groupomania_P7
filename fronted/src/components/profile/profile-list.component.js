// import 'date-fns';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Container, Grid, CssBaseline } from '@material-ui/core';
import 'date-fns';
import { withStyles } from '@material-ui/styles';
import { getAllProfile } from './../../actions/auth';
import ProfileCardComponent from './profile-list-card.component';
import ProfilCard from './profile-card.component';

/**
 * Définition des classes à utiliser
 *
 */
const styles = () => ({});
/**
 * Card de l'utilisateur courant
 *
 * @class AllUsersProfiles
 * @extends {Component}
 */
class AllUsersProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Chargement du profile
   *
   * @memberof AllUsersProfiles
   */
  componentDidMount() {
    this.props
      .getAllProfile()
      .then((response) => {
        this.setState({
          profiles: response.data
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
   * @memberof AllUsersProfiles
   */
  render() {
    const { profiles } = this.props;

    return (
      <Fragment>
        <CssBaseline />

        <div className="page">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <ProfilCard />
              </Grid>
              <Grid item xs={8} container>
                <Grid container spacing={3}>
                  {profiles &&
                    profiles.map((res) => (
                      <Grid key={res.user_id} xs={12} lg={4} item>
                        <ProfileCardComponent viewedUserDatas={res} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { profiles } = state.profiles;
  return {
    profiles
  };
}

export default connect(mapStateToProps, {
  getAllProfile
})(withStyles(styles)(AllUsersProfiles));

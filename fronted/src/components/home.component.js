import React, { Component, Fragment } from 'react';
// import { Redirect } from 'react-router-dom';

import UserService from '../services/user.service';
import CssBaseline from '@material-ui/core/CssBaseline';

import CreatePost from '../components/posts/post-create.component';
import AllPosts from '../components/posts/post-all.component';
import ProfilCard from '../components/profile/profile-card.component';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

/**
 * Page d'accueil
 *
 * @export
 * @class Home
 * @extends {Component}
 */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    UserService.getHome().then(
      (response) => {
        this.setState({
          content: response.data
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <div className="page">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <ProfilCard />
              </Grid>
              <Grid item xs={8}>
                <CreatePost />
                <AllPosts />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}

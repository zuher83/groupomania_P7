import React, { Component, Fragment } from 'react';
// import { Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import CreatePost from '../components/posts/post-create.component';
import FollowedComponent from './post-followed.page';
import ProfilCard from '../components/profile/profile-card.component';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

/**
 * Page d'actualité des personnes suivi
 *
 * @export
 * @class FeedFollowed
 * @extends {Component}
 */
export default class FeedFollowed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <div className="page">
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={false} md={4}>
                <ProfilCard />
              </Grid>
              <Grid item xs={12} md={8}>
                <CreatePost />
                <FollowedComponent />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}

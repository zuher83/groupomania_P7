import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import CreatePost from '../components/posts/post-create.component';
import AllPosts from './post-all.page';
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
                <AllPosts />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}

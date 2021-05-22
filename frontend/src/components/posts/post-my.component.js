import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { retrieveMyPosts } from '../../actions/post';
import PostComponent from './post.component';

import { withStyles } from '@material-ui/styles';

const styles = () => ({});

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  /**
   * Charge les donnés du profile affiché
   *
   * @param userId Indiquer l'utilisateur en cours avec une props user_id
   * @memberof PostsList
   */
  componentDidMount() {
    this.props
      .retrieveMyPosts(this.props.userId)
      .then((res) => {
        this.setState({ posts: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props
        .retrieveMyPosts(this.props.userId)
        .then((res) => {
          this.setState({ posts: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const { posts } = this.props;

    return (
      <Fragment>
        <div>
          {posts &&
            posts
              .reverse()
              .map((res) => (
                <PostComponent key={res.post_id} post_id={res.post_id} />
              ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  retrieveMyPosts
})(withStyles(styles)(PostsList));

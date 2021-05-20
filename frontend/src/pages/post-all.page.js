import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { retrieveAllPosts } from '../actions/post';
import PostComponent from '../components/posts/post.component';

import { withStyles } from '@material-ui/styles';

const styles = () => ({});

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  componentDidMount() {
    this.props
      .retrieveAllPosts()
      .then((res) => {
        this.setState({ posts: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts });
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
  retrieveAllPosts
})(withStyles(styles)(PostsList));

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
  componentDidMount() {
    this.props.retrieveMyPosts();
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
                <PostComponent key={res.post_id} postId={res.post_id} />
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
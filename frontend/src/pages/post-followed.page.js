import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { retrieveFriendsPosts } from '../actions/post';
import PostComponent from '../components/posts/post.component';

import { withStyles } from '@material-ui/styles';

const styles = () => ({});

class PostsFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  /**
   * Charge les posts des membres suivi
   *
   * @param userId Indiquer l'utilisateur en cours avec une props user_id
   * @memberof PostsFriendsList
   */
  componentDidMount() {
    this.props
      .retrieveFriendsPosts(this.props.userId)
      .then((res) => {
        this.setState({ posts: res });
      })
      .catch((err) => {
        console.log(err);
      });
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
  retrieveFriendsPosts
})(withStyles(styles)(PostsFriendsList));

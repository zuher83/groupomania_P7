import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { retrieveFriendsPosts } from './../../actions/post';
import PostComponent from './post.component';

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
   * @param user_id Indiquer l'utilisateur en cours avec une props user_id
   * @memberof PostsFriendsList
   */
  componentDidMount() {
    this.props
      .retrieveFriendsPosts()
      .then((res) => {
        console.log(res);

        this.setState({ posts: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { friend_posts } = this.props;

    return (
      <Fragment>
        <div>
          {friend_posts &&
            friend_posts
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
  friend_posts: state.posts
});

export default connect(mapStateToProps, {
  retrieveFriendsPosts
})(withStyles(styles)(PostsFriendsList));

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/auth';
import PropTypes from 'prop-types';

import { setMessage } from '../../../actions/message';
import UserService from '../../../services/user.service';

import { Fab } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = () => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5,
      width: '47%'
    }
  },
  iconButton: {
    position: 'absolute',
    bottom: 5,
    left: 10
  }
});

class ProfileDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteUserProfile = this.deleteUserProfile.bind(this);

    this.state = {
      editable: false,
      modal_open: false,
      userViewer: ''
    };
  }

  componentDidMount() {
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (
      userViewer.roles[0] === 'ROLE_ADMIN' ||
      userViewer.user_id === this.props.user_id.user_id
    ) {
      this.setState({
        userViewer: userViewer.user_id,
        editable: true
      });
    }
  }

  /**
   * Supprime le profile si l'utlisateur courant ou admin
   *
   * @memberof Profile
   */
  deleteUserProfile() {
    console.log(this.props);
    const userId = this.props.user_id.user_id;
    UserService.deleteUser(userId)
      .then(() => {
        this.props.setMessage({
          message: 'Profil supprimé!'
        });

        if (this.state.userViewer === this.props.user_id.user_id) {
          localStorage.removeItem('user');
          location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.state.editable === true && (
          <Fab
            color="secondary"
            className={(classes.fab, classes.iconButton)}
            onClick={this.deleteUserProfile}
            size="small"
          >
            <DeleteForeverIcon className={classes.editIconField} />
          </Fab>
        )}
      </Fragment>
    );
  }
}

ProfileDelete.propTypes = {
  user_id: PropTypes.object.isRequired
};

export default connect(null, { deleteUser, setMessage })(
  withStyles(styles)(ProfileDelete)
);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/auth';
import PropTypes from 'prop-types';

import { setMessage } from '../../../actions/message';
import UserService from '../../../services/user.service';

import { IconButton } from '@material-ui/core';

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
    left: 10,
    backgroundColor: '#fff'
  }
});

class ProfileDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteUserProfile = this.deleteUserProfile.bind(this);

    this.state = {
      editable: false,
      modal_open: false
    };
  }

  componentDidMount() {
    const userViewer = JSON.parse(localStorage.getItem('user'));
    if (
      userViewer.roles[0] === 'ROLE_ADMIN' ||
      userViewer.user_id === this.props.user_id.user_id
    ) {
      this.setState({
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
    const userId = this.props.match.params.id;
    UserService.deleteUser(userId)
      .then(() => {
        this.props.setMessage({
          message: 'Profil supprimé!'
        });

        if (this.props.user.user_id === this.props.match.params.id) {
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
          <IconButton
            aria-label="delete"
            onClick={this.deleteUserProfile}
            className={classes.iconButton}
          >
            <DeleteForeverIcon className={classes.editIconField} />
          </IconButton>
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

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearMessage } from './../actions/message';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: 15
    }
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DisplayMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.floor(Math.random() * 510000),
      open: false,
      message: '',
      severity: 'success'
    };
  }

  componentDidMount() {
    this.setState({
      message: this.props.message,
      open: true
    });
    if (this.props.severity) {
      this.setState({
        severity: this.props.severity
      });
    }
  }

  render() {
    const handleClose = () => {
      this.setState({ ...this.state, open: false });
    };
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root} key={this.state.id}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={this.state.severity}>
              {this.state.message}
            </Alert>
          </Snackbar>
        </div>
      </Fragment>
    );
  }
}

DisplayMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default connect(null, { clearMessage })(
  withStyles(styles)(DisplayMessage)
);

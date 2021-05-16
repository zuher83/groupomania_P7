import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
      open: false,
      message: '',
      severity: 'success'
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message,
        open: true,
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
        <div className={classes.root} key={this.props.message}>
          <span>{this.state.message}</span>
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

export default connect(null, {})(withStyles(styles)(DisplayMessage));
import React, { Component } from 'react';

import Login from '../components/login.component';

export default class PublicHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  render() {
    return (
      <div className="container">
        <Login />
      </div>
    );
  }
}

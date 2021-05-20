import React, { Component } from 'react';

import Login from './login.page';

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

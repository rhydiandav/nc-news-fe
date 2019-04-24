import React, { Component } from 'react';
import { getUser } from '../api';
import '../styles/User.css';

export default class User extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    getUser(this.props.username).then(({ user }) => this.setState({ user }));
  }

  render() {
    return (
      <div className="content-card user-card">
        <img src={this.state.user.avatar_url} alt="avatar" />
        <div>
          <h3>{this.state.user.username}</h3>
          <p>{this.state.user.name}</p>
        </div>
      </div>
    );
  }
}

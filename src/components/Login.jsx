import React, { Component } from 'react';
import { getUser } from '../api';
import { navigate } from '@reach/router';

export default class Login extends Component {
  state = { usernameInput: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    getUser(this.state.usernameInput).then(({ user }) => {
      if (user) {
        this.props.logIn(user.username);
        navigate(`/users/${user.username}`);
      } else {
        alert('Username not found');
      }
    });
  };

  render() {
    return (
      <div className="content-card">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="usernameInput"
            onChange={this.handleChange}
          />
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

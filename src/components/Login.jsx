import React, { Component } from 'react';
import { getUser } from '../api';
import { navigate } from '@reach/router';
import SubHeader from './SubHeader';

export default class Login extends Component {
  state = { usernameInput: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    getUser(this.state.usernameInput)
      .then(({ data: { user } }) => {
        this.props.logIn(user.username);
        navigate(`/`);
      })
      .catch(err => {
        alert(err.response.data.msg);
      });
  };

  render() {
    return (
      <>
        <SubHeader topic="Log In" />
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
      </>
    );
  }
}

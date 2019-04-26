import React, { Component } from 'react';
import SubHeader from '../components/SubHeader';
import { postNewUser } from '../api';
import { navigate } from '@reach/router';

export default class NewUser extends Component {
  state = {
    username: '',
    avatar_url: '',
    name: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, avatar_url, name } = this.state;
    const userToAdd = {
      username,
      avatar_url,
      name
    };

    postNewUser(userToAdd)
      .then(user => {
        this.setState({
          username: '',
          avatar_url: '',
          name: ''
        });
        this.props.logIn(user.username);
        navigate(`/users/${user.username}`);
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <SubHeader topic="Sign Up" />
        <div className="content-card">
          <form onSubmit={this.handleSubmit}>
            Username:{' '}
            <input type="text" name="username" onChange={this.handleChange} />
            Avatar URL:{' '}
            <input type="text" name="avatar_url" onChange={this.handleChange} />
            Name: <input type="text" name="name" onChange={this.handleChange} />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </>
    );
  }
}

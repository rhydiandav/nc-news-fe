import React, { Component } from 'react';
import { getUser } from '../api';
import '../styles/User.css';
import SubHeader from './SubHeader';
import { navigate } from '@reach/router';

export default class User extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    getUser(this.props.username)
      .then(({ data: { user } }) => this.setState({ user }))
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });
  }

  render() {
    return (
      <>
        <SubHeader topic={this.state.user.username} />
        <div className="content-card user-card">
          <img src={this.state.user.avatar_url} alt="avatar" />
          <div>
            <h3>{this.state.user.username}</h3>
            <p>{this.state.user.name}</p>
          </div>
        </div>
      </>
    );
  }
}

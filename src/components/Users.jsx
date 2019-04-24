import React, { Component } from 'react';
import { getUsers } from '../api';
import UserListCard from './UserListCard';

export default class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    getUsers().then(({ users }) => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        {this.state.users.map(user => {
          return <UserListCard user={user} key={user.username} />;
        })}
      </div>
    );
  }
}

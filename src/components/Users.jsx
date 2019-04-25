import React, { Component } from 'react';
import { getUsers } from '../api';
import UserListCard from './UserListCard';
import SubHeader from './SubHeader';

export default class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    getUsers().then(({ users }) => this.setState({ users }));
  }

  render() {
    return (
      <>
        <SubHeader topic="Users" />
        <div>
          {this.state.users.map(user => {
            return <UserListCard user={user} key={user.username} />;
          })}
        </div>
      </>
    );
  }
}

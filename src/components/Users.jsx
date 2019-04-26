import React, { Component } from 'react';
import { getUsers } from '../api';
import UserListCard from './UserListCard';
import SubHeader from './SubHeader';
import { navigate } from '@reach/router';

export default class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    getUsers()
      .then(({ data: { users } }) => this.setState({ users }))
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

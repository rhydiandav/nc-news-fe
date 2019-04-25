import React, { Component } from 'react';
import SubHeader from '../components/SubHeader';

export default class NewUser extends Component {
  render() {
    return (
      <>
        <SubHeader topic="Sign Up" />
        <div className="content-card">
          <form>
            Username: <input type="text" name="username" />
            Avatar URL: <input type="text" name="avatar_url" />
            Name: <input type="text" name="name" />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </>
    );
  }
}

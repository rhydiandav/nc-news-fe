import React, { Component } from 'react';

export default class NewUser extends Component {
  render() {
    return (
      <div className="content-card">
        <form>
          Username: <input type="text" name="username" />
          Avatar URL: <input type="text" name="avatar_url" />
          Name: <input type="text" name="name" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

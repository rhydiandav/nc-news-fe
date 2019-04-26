import React, { Component } from 'react';
import { postNewComment } from '../api';
import { Link } from '@reach/router';

export default class PostComment extends Component {
  state = {
    body: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const commentToPost = {
      username: this.props.loggedInUser,
      body: this.state.body
    };
    postNewComment(this.props.id, commentToPost).then(() => {
      this.setState({ body: '' });
    });
  };

  render() {
    return (
      <div className="content-card">
        {this.props.loggedInUser && (
          <form onSubmit={this.handleSubmit}>
            New Comment:{' '}
            <input type="text" name="body" onChange={this.handleChange} />
            <input type="submit" value="Post" />
          </form>
        )}
        {!this.props.loggedInUser && (
          <p>
            You need to <Link to="/login">log in</Link> before you can post a
            comment.
          </p>
        )}
      </div>
    );
  }
}

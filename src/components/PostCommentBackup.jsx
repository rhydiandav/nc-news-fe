import React, { Component } from 'react';

export default class PostComment extends Component {
  render() {
    return (
      <div className="content-card">
        <form onSubmit={this.props.handleSubmit}>
          New Comment:{' '}
          <input
            type="text"
            name="commentToPost"
            onChange={this.props.handleChange}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

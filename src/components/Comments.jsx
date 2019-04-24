import React, { Component } from 'react';
import { fetchComments } from '../api';
import '../styles/Comments.css';

export default class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    fetchComments(this.props.id).then(({ comments }) => {
      this.setState({ comments });
    });
  }

  render() {
    return this.state.comments.map(comment => {
      return (
        <div className="comment-card content-card" key={comment.comment_id}>
          <div className="vote-panel">
            <p>^</p>
            <p>{comment.votes}</p>
            <p>v</p>
          </div>
          <div className="comment-details">
            <p>
              Posted by: {comment.author} on {comment.created_at.slice(0, 10)}
            </p>
            <p>{comment.body}</p>
          </div>
        </div>
      );
    });
  }
}

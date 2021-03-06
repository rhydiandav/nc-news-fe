import React, { Component } from 'react';
import '../styles/Comments.css';
import VotePanel from '../components/VotePanel';
import { deleteComment } from '../api';
import { Link } from '@reach/router';

export default class Comments extends Component {
  handleDelete = comment_id => {
    deleteComment(comment_id);
    this.props.handleCommentUpdate();
  };

  render() {
    return (
      this.props.comments &&
      this.props.comments.map(comment => {
        return (
          <div className="comment-card content-card" key={comment.comment_id}>
            <VotePanel item={comment} loggedInUser={this.props.loggedInUser} />
            <div className="comment-details">
              <p>
                Posted by:{' '}
                <Link to={`/users/${comment.author}`}>{comment.author}</Link> on{' '}
                {comment.created_at.slice(0, 10)}
              </p>
              <p>{comment.body}</p>
              {this.props.loggedInUser === comment.author && (
                <button
                  onClick={() => {
                    this.handleDelete(comment.comment_id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })
    );
  }
}

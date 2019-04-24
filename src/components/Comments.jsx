import React, { Component } from 'react';
import { fetchComments } from '../api';
import '../styles/Comments.css';
import VotePanel from '../components/VotePanel';
import { deleteComment } from '../api';

export default class Comments extends Component {
  state = {
    comments: []
  };

  handleDelete = comment_id => {
    deleteComment(comment_id);
  };

  componentDidMount() {
    fetchComments(this.props.id).then(({ comments, comment }) => {
      this.setState({ comments: comments || [comment] });
    });
  }

  componentDidUpdate() {
    fetchComments(this.props.id).then(({ comments, comment }) => {
      this.setState({ comments: comments || [comment] });
    });
  }

  render() {
    return (
      this.state.comments &&
      this.state.comments.map(comment => {
        return (
          <div className="comment-card content-card" key={comment.comment_id}>
            <VotePanel item={comment} loggedInUser={this.props.loggedInUser} />
            <div className="comment-details">
              <p>
                Posted by: {comment.author} on {comment.created_at.slice(0, 10)}
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

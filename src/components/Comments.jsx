import React, { Component } from 'react';
import { fetchComments } from '../api';
import '../styles/Comments.css';
import VotePanel from '../components/VotePanel';

export default class Comments extends Component {
  state = {
    comments: []
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
            </div>
          </div>
        );
      })
    );
  }
}

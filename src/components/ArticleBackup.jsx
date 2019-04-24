import React, { Component } from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';
import PostComment from './PostComment';
import { postNewComment } from '../api';

export default class Article extends Component {
  state = {
    commentToPost: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const commentToPost = {
      username: this.props.loggedInUser,
      body: this.state.commentToPost
    };
    postNewComment(this.props.id, commentToPost);
  };

  render() {
    return (
      <>
        <ArticleCard id={this.props.id} />
        <div className="content-card">
          <h3>Comments:</h3>
        </div>
        <Comments id={this.props.id} loggedInUser={this.props.loggedInUser} />
        <PostComment
          loggedInUser={this.props.loggedInUser}
          id={this.props.id}
          commentToPost={this.state.commentToPost}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

import React, { Component } from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';
import PostComment from './PostComment';
import SubHeader from '../components/SubHeader';
import { fetchComments } from '../api';

export default class Article extends Component {
  state = { comments: [], newComment: false };

  componentDidMount() {
    fetchComments(this.props.id).then(({ data: { comments, comment } }) => {
      this.setState({ comments: comments || [comment] });
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.newComment !== prevState.newComment) {
      fetchComments(this.props.id).then(({ data: { comments, comment } }) => {
        this.setState({ comments: comments || [comment], newComment: false });
      });
    }
  }

  handleNewComment = () => {
    this.setState({ newComment: true });
  };

  render() {
    return (
      <>
        <SubHeader topic="Article" />
        <ArticleCard
          id={this.props.id}
          loggedInUser={this.props.loggedInUser}
        />
        <div className="content-card">
          <h3>Comments:</h3>
        </div>
        <Comments
          comments={this.state.comments}
          loggedInUser={this.props.loggedInUser}
        />
        <PostComment
          id={this.props.id}
          loggedInUser={this.props.loggedInUser}
          handleNewComment={this.handleNewComment}
        />
      </>
    );
  }
}

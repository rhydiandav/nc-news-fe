import React, { Component } from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';
import PostComment from './PostComment';
import SubHeader from '../components/SubHeader';
import { fetchComments, fetchArticle, deleteArticle } from '../api';
import { navigate } from '@reach/router';

export default class Article extends Component {
  state = { comments: [], commentsUpdated: false, p: 1, article: {} };

  handleDelete = e => {
    deleteArticle(this.props.id).then(res => {
      navigate('/');
    });
  };

  componentDidMount() {
    fetchArticle(this.props.id)
      .then(({ data: { article } }) => {
        this.setState({ article });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });

    fetchComments(this.props.id, this.state.p).then(
      ({ data: { comments, comment } }) => {
        this.setState({ comments: comments || [comment] });
      }
    );
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.commentsUpdated !== prevState.commentsUpdated ||
      this.state.p !== prevState.p
    ) {
      fetchComments(this.props.id, this.state.p).then(
        ({ data: { comments, comment } }) => {
          this.setState({
            comments: comments || [comment],
            commentsUpdated: false
          });
        }
      );
    }
  }

  handleCommentUpdate = () => {
    this.setState({ commentsUpdated: true });
  };

  handlePageChangeClick = direction => {
    this.setState({ p: this.state.p + direction });
  };

  render() {
    return (
      <>
        <SubHeader topic="Article" />
        <ArticleCard
          article={this.state.article}
          handleDelete={this.handleDelete}
          loggedInUser={this.props.loggedInUser}
        />
        <div className="content-card">
          <h3>Comments:</h3>
          {this.state.p !== 1 && (
            <button onClick={() => this.handlePageChangeClick(-1)}>
              Prev Page
            </button>
          )}
          {this.state.p !==
            Math.ceil(this.state.article.comment_count / 10) && (
            <button onClick={() => this.handlePageChangeClick(1)}>
              Next Page
            </button>
          )}
        </div>
        <Comments
          comments={this.state.comments}
          loggedInUser={this.props.loggedInUser}
          handleCommentUpdate={this.handleCommentUpdate}
        />
        <PostComment
          id={this.props.id}
          loggedInUser={this.props.loggedInUser}
          handleCommentUpdate={this.handleCommentUpdate}
        />
      </>
    );
  }
}

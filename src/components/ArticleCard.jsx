import React, { Component } from 'react';
import { deleteArticle, fetchArticle } from '../api';
import { navigate, Link } from '@reach/router';

export default class ArticleCard extends Component {
  state = { article: {} };

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
  }

  render() {
    return (
      <div className="article content-card">
        <p>
          Posted by{' '}
          <Link to={`/users/${this.state.article.author}`}>
            {this.state.article.author}
          </Link>{' '}
          on{' '}
          {this.state.article.created_at &&
            this.state.article.created_at.slice(0, 10)}
        </p>
        <h3>{this.state.article.title}</h3>
        <p>{this.state.article.body}</p>
        <p>Comments: {this.state.article.comment_count}</p>
        {this.props.loggedInUser === this.state.article.author && (
          <button onClick={this.handleDelete}>Delete</button>
        )}
      </div>
    );
  }
}

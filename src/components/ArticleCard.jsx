import React, { Component } from 'react';
import { deleteArticle } from '../api';
import { navigate, Link } from '@reach/router';

export default class ArticleCard extends Component {
  state = { article: {} };

  handleDelete = e => {
    deleteArticle(this.props.id).then(res => {
      navigate('/');
    });
  };

  componentDidMount() {
    fetch(`http://n-c-news.herokuapp.com/api/articles/${this.props.id}`)
      .then(res => res.json())
      .then(({ article }) => {
        this.setState({ article });
      });
  }

  componentDidUpdate() {
    fetch(`http://n-c-news.herokuapp.com/api/articles/${this.props.id}`)
      .then(res => res.json())
      .then(({ article }) => {
        this.setState({ article });
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

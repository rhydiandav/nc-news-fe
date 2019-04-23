import React, { Component } from 'react';
import '../index.css';
import '../styles/Articles.css';

export default class ArticleList extends Component {
  state = { articles: [], total_count: 0 };

  componentDidMount() {
    fetch('http://n-c-news.herokuapp.com/api/articles')
      .then(res => res.json())
      .then(({ articles, total_count }) => {
        console.log(total_count);
        this.setState({ articles, total_count });
      });
  }

  render() {
    return (
      <div className="articles">
        <div className="topic-key content-card">
          <h3>Front Page</h3>
          <p>Total articles: {this.state.total_count}</p>
          <p>All articles...</p>
          <p>Sort by: </p>
        </div>
        <div className="article-list">
          {this.state.articles.map(article => {
            return (
              <div
                className="article-card content-card"
                key={article.article_id}
              >
                <p>
                  Posted by {article.author} on{' '}
                  {article.created_at.slice(0, 10)}
                </p>
                <h3>{article.title}</h3>
                <p>Comments: {article.comment_count}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { getUser, fetchArticles } from '../api';
import '../styles/User.css';
import SubHeader from './SubHeader';
import { navigate } from '@reach/router';
import ArticleListCard from '../components/ArticleListCard';

export default class User extends Component {
  state = {
    user: {},
    articles: []
  };

  componentDidMount() {
    getUser(this.props.username)
      .then(({ data: { user } }) => this.setState({ user }))
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.response.data.msg
          }
        });
      });

    fetchArticles({ author: this.props.username }).then(
      ({ data: { articles, article } }) => {
        this.setState({ articles: articles || [article] });
      }
    );
  }

  render() {
    return (
      <>
        <SubHeader topic={this.state.user.username} />
        <div className="articles">
          <div className="sidebar">
            <div className="content-card user-card">
              <img src={this.state.user.avatar_url} alt="avatar" />
              <div className="user-info">
                <h3>{this.state.user.username}</h3>
                <p>{this.state.user.name}</p>
              </div>
            </div>
          </div>
          <div className="article-list">
            {this.state.articles.length === 0 && (
              <div className="content-card">
                <p>No articles here yet.</p>
              </div>
            )}
            {this.state.articles.map(article => {
              return (
                <ArticleListCard
                  article={article}
                  key={article.article_id}
                  loggedInUser={this.props.loggedInUser}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

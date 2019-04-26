import React, { Component } from 'react';
import { getUser, fetchArticles } from '../api';
import '../styles/User.css';
import SubHeader from './SubHeader';
import { navigate } from '@reach/router';
import ArticleListCard from '../components/ArticleListCard';
import ArticleNavigation from '../components/ArticleNavigation';

export default class User extends Component {
  state = {
    user: {},
    articles: [],
    total_count: 0,
    sort_by: 'created_at',
    order: 'desc',
    p: 1
  };

  handlePageChangeClick = direction => {
    this.setState({ p: this.state.p + direction });
  };

  handleSortByChange = e => {
    this.setState({ p: 1, sort_by: e.target.value });
  };

  handleOrderChange = e => {
    this.setState({ p: 1, order: e.target.value });
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
      ({ data: { articles, article, total_count } }) => {
        console.log(article);
        this.setState({ articles: articles || [article], total_count });
      }
    );
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.p !== this.state.p ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      const params = {
        author: this.props.username,
        p: this.state.p,
        sort_by: this.state.sort_by,
        order: this.state.order
      };

      fetchArticles(params).then(
        ({ data: { total_count, articles, article } }) => {
          this.setState({ articles: articles || [article], total_count });
        }
      );
    }
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
                <h4>{this.state.user.name}</h4>
                <p>Total articles: {this.state.total_count}</p>
              </div>
            </div>

            <ArticleNavigation
              loggedInUser={this.props.loggedInUser}
              p={this.state.p}
              total_count={this.state.total_count}
              handlePageChangeClick={this.handlePageChangeClick}
              handleSortByChange={this.handleSortByChange}
              handleOrderChange={this.handleOrderChange}
              author={true}
            />
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

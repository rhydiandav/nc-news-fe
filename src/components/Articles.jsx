import React, { Component } from 'react';
import { fetchArticles } from '../api';
import '../styles/Articles.css';
import ArticleListCard from './ArticleListCard';
import TopicCard from './TopicCard';
import SubHeader from './SubHeader';
import { Link } from '@reach/router';

export default class Articles extends Component {
  state = {
    articles: [],
    total_count: 0,
    p: 1,
    sort_by: 'created_at',
    order: 'desc'
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
    fetchArticles().then(({ data: { total_count, articles, article } }) => {
      this.setState({ articles: articles || [article], total_count });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.slug !== this.props.slug ||
      prevState.p !== this.state.p ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      const params = {
        p: this.state.p,
        sort_by: this.state.sort_by,
        order: this.state.order
      };
      if (this.props.slug) params.topic = this.props.slug;

      fetchArticles(params).then(({ data: { total_count, articles } }) => {
        this.setState({ articles, total_count });
      });
    }
  }

  render() {
    const slug = this.props.slug ? this.props.slug : 'front-page';
    return (
      <>
        <SubHeader topic={this.props.slug || 'Front Page'} />

        <div className="articles">
          <div className="sidebar">
            <TopicCard
              slug={slug}
              total_count={this.state.total_count}
              loggedInUser={this.props.loggedInUser}
            />

            <div className="content-card article-navigation">
              <Link to="/articles/new">
                {this.props.loggedInUser && <button>New Article</button>}
              </Link>

              {this.state.p !== 1 && (
                <button onClick={() => this.handlePageChangeClick(-1)}>
                  Prev Page
                </button>
              )}
              {this.state.p !== Math.ceil(this.state.total_count / 10) && (
                <button onClick={() => this.handlePageChangeClick(1)}>
                  Next Page
                </button>
              )}
              <select name="sort_by" onChange={this.handleSortByChange}>
                <option value="created_at">Date Created</option>
                <option value="author">User</option>
                <option value="title">Title</option>
                <option value="comment_count">Number of Comments</option>
              </select>
              <select name="order" onChange={this.handleOrderChange}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <div className="article-list">
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

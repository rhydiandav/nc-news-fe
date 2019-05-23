import React, { Component } from 'react';
import { fetchArticles } from '../api';
import '../styles/Articles.css';
import ArticleListCard from './ArticleListCard';
import TopicCard from './TopicCard';
import SubHeader from './SubHeader';
import ArticleNavigation from './ArticleNavigation';
import Loading from './Loading';
import { navigate } from '@reach/router';

export default class Articles extends Component {
  state = {
    isLoading: true,
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
    fetchArticles()
      .then(({ data: { total_count, articles, article } }) => {
        this.setState({
          isLoading: false,
          articles: articles || [article],
          total_count
        });
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.slug !== this.props.slug ||
      prevState.p !== this.state.p ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      const page = prevProps.slug !== this.props.slug ? 1 : this.state.p;

      const params = {
        p: page,
        sort_by: this.state.sort_by,
        order: this.state.order
      };
      if (this.props.slug) params.topic = this.props.slug;

      fetchArticles(params)
        .then(({ data: { total_count, articles } }) => {
          this.setState({ articles, total_count, p: page });
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
  }

  render() {
    const slug = this.props.slug ? this.props.slug : 'front-page';
    return (
      <>
        <SubHeader topic={this.props.slug || 'Front Page'} />
        <div className="articles">
          {this.state.isLoading && <Loading />}
          <div className="sidebar">
            <TopicCard
              slug={slug}
              total_count={this.state.total_count}
              loggedInUser={this.props.loggedInUser}
            />

            <ArticleNavigation
              loggedInUser={this.props.loggedInUser}
              p={this.state.p}
              total_count={this.state.total_count}
              handlePageChangeClick={this.handlePageChangeClick}
              handleSortByChange={this.handleSortByChange}
              handleOrderChange={this.handleOrderChange}
            />
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

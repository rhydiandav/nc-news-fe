import React, { Component } from 'react';
import '../index.css';
import '../styles/Articles.css';
import ArticleListCard from './ArticleListCard';
import TopicCard from './TopicCard';

export default class ArticleList extends Component {
  state = { articles: [], total_count: 0 };

  fetchArticles = () => {
    const { slug } = this.props;

    fetch(
      `http://n-c-news.herokuapp.com/api/articles${
        slug ? `?topic=${slug}` : ''
      }`
    )
      .then(res => res.json())
      .then(({ articles, total_count }) => {
        this.setState({ articles, total_count });
      });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevState) {
    prevState.slug !== this.props.slug && this.fetchArticles();
  }

  render() {
    const slug = this.props.slug ? this.props.slug : 'front-page';
    return (
      <div className="articles">
        <TopicCard slug={slug} total_count={this.state.total_count} />
        <div className="article-list">
          {this.state.articles.map(article => {
            return (
              <ArticleListCard article={article} key={article.article_id} />
            );
          })}
        </div>
      </div>
    );
  }
}

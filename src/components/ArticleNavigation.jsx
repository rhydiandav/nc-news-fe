import React from 'react';
import { navigate } from '@reach/router';
import '../styles/ArticleNavigation.css';

const ArticleNavigation = props => {
  return (
    <div className="content-card article-navigation">
      {props.loggedInUser && (
        <button
          className="new-article"
          onClick={() => navigate('/articles/new')}
        >
          New Article
        </button>
      )}

      <div className="page-nav">
        {props.p !== 1 && (
          <button
            className="prev-page"
            onClick={() => props.handlePageChangeClick(-1)}
          >
            <i className="fas fa-caret-left" />
          </button>
        )}
        <p className="page-num">Page: {props.p}</p>
        {props.p < Math.ceil(props.total_count / 10) && (
          <button
            className="next-page"
            onClick={() => props.handlePageChangeClick(1)}
          >
            <i className="fas fa-caret-right" />
          </button>
        )}
      </div>

      <div className="sort">
        <p>Sort by:</p>

        <select name="sort_by" onChange={props.handleSortByChange}>
          <option value="created_at">Date Created</option>
          {!props.author && <option value="author">User</option>}
          <option value="title">Title</option>
          <option value="comment_count">Number of Comments</option>
          <option value="votes">Number of Votes</option>
        </select>

        <select name="order" onChange={props.handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default ArticleNavigation;

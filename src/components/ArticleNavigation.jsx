import React from 'react';
import { Link } from '@reach/router';

const ArticleNavigation = props => {
  return (
    <div className="content-card article-navigation">
      <Link to="/articles/new">
        {props.loggedInUser && <button>New Article</button>}
      </Link>

      {props.p !== 1 && (
        <button onClick={() => props.handlePageChangeClick(-1)}>
          Prev Page
        </button>
      )}
      {props.p !== Math.ceil(props.total_count / 10) && (
        <button onClick={() => props.handlePageChangeClick(1)}>
          Next Page
        </button>
      )}
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
  );
};

export default ArticleNavigation;

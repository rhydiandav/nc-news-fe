import React from 'react';
import { Link } from '@reach/router';
import '../index.css';
import '../styles/ArticleCard.css';

const ArticleCard = props => {
  return (
    <div className="article-list-card content-card">
      <div className="vote-panel">
        <p>^</p>
        <p>{props.article.votes}</p>
        <p>v</p>
      </div>
      <div className="article-details">
        <p>
          Posted by {props.article.author} on{' '}
          {props.article.created_at.slice(0, 10)}
        </p>
        <h3>
          <Link to={`/articles/${props.article.article_id}`}>
            {props.article.title}
          </Link>
        </h3>
        <p>Comments: {props.article.comment_count}</p>
      </div>
    </div>
  );
};

export default ArticleCard;

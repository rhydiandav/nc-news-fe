import React from 'react';
import { Link } from '@reach/router';
import '../styles/ArticleListCard.css';
import VotePanel from './VotePanel';

const ArticleCard = props => {
  return (
    <div className="article-list-card content-card">
      <VotePanel item={props.article} loggedInUser={props.loggedInUser} />
      <div className="article-details">
        <p>
          Posted by{' '}
          <Link to={`/users/${props.article.author}`}>
            {props.article.author}
          </Link>{' '}
          on {props.article.created_at.slice(0, 10)}
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

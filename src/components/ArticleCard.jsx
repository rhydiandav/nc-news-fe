import React from 'react';
import { Link } from '@reach/router';
import '../styles/ArticleCard.css';
import VotePanel from './VotePanel';

const ArticleCard = props => {
  return (
    <div className="article-card content-card">
      <VotePanel item={props.article} loggedInUser={props.loggedInUser} />
      <div className="article-details">
        <p>
          Posted by{' '}
          <Link to={`/users/${props.article.author}`}>
            {props.article.author}
          </Link>{' '}
          on {props.article.created_at && props.article.created_at.slice(0, 10)}
        </p>
        <h3>{props.article.title}</h3>
        <p>{props.article.body}</p>
        <p>Comments: {props.article.comment_count}</p>
        {props.loggedInUser === props.article.author && (
          <button onClick={props.handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;

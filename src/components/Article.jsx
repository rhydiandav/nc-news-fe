import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';
import PostComment from './PostComment';

const Article = props => {
  return (
    <>
      <ArticleCard id={props.id} loggedInUser={props.loggedInUser} />
      <div className="content-card">
        <h3>Comments:</h3>
      </div>
      <Comments id={props.id} loggedInUser={props.loggedInUser} />
      <PostComment id={props.id} loggedInUser={props.loggedInUser} />
    </>
  );
};

export default Article;

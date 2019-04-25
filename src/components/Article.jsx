import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';
import PostComment from './PostComment';
import SubHeader from '../components/SubHeader';

const Article = props => {
  return (
    <>
      <SubHeader topic="Article" />
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

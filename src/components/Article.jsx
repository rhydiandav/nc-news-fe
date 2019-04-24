import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Comments from './Comments';

const Article = props => {
  return (
    <>
      <ArticleCard id={props.id} />
      <div className="content-card">
        <h3>Comments:</h3>
      </div>
      <Comments id={props.id} />
    </>
  );
};

export default Article;

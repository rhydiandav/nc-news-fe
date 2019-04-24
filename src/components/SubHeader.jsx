import React from 'react';
import '../styles/SubHeader.css';

const SubHeader = props => {
  return (
    <div className="subheader">
      <h2>
        {props.topic[0].toUpperCase()}
        {props.topic.slice(1)}
      </h2>
    </div>
  );
};

export default SubHeader;

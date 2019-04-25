import React from 'react';
import SubHeader from '../components/SubHeader';

const Error = props => {
  return (
    <>
      <SubHeader topic="Error" />
      <div className="content-card">
        {props.location.state ? props.location.state.msg : 'Page not found'}
      </div>
    </>
  );
};

export default Error;

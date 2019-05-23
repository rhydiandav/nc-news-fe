import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div class="loading-animation">
      <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;

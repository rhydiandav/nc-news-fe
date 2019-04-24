import React from 'react';
import { Link } from '@reach/router';

const UserListCard = props => {
  return (
    <div className="content-card">
      <Link to={`/users/${props.user.username}`}>
        <h4>{props.user.username}</h4>
      </Link>
      <p>{props.user.username}</p>
    </div>
  );
};

export default UserListCard;

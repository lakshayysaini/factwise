import React from 'react';
import usersData from '../data/users.json';
import UserListItem from './UserListItem';

const UserList = () => {
  return (
    <div className="user-list">
      {usersData.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;

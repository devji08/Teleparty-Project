import React from "react";

const UserRow = ({ user }) => {
  console.log(user);
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <img
          className="w-14 rounded"
          src={user.avatarUrl}
          alt="User Profile Pic"
        />
      </div>
      <div className="flex-1">{user.name}</div>
      <div className="flex-1">
        <a href={user.url} target="_blank">
          @{user.login}
        </a>
      </div>
      <div className="flex-1">{user.followers.totalCount}</div>
    </div>
  );
};

export default UserRow;

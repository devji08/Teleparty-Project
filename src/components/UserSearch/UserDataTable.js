import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Bars } from "react-loading-icons";

import { fetchUserData } from "../../utils";
import UserRow from "./UserRow";

const UserDataTable = ({ name }) => {
  const [userData, setUserData] = useState({
    users: [],
    pageInfo: {},
    userCount: -1,
  });

  const [loading, setLoading] = useState(false);

  const getStateFromData = (data) => {
    const users = _.map(data.data.search.edges, (item) => item.node);
    const pageInfo = data.data.search.pageInfo;
    const userCount = data.data.search.userCount;

    return { users, pageInfo, userCount };
  };

  useEffect(() => {
    if (!_.isEmpty(name)) {
      setLoading(true);
      fetchUserData(name)
        .then((res) => {
          const newState = getStateFromData(res);
          setUserData(newState);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [name]);

  if (_.isEmpty(name)) {
    return <div>Type a name in input to search GitHub Users!</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Bars />
        <span>Loading user data...!</span>
      </div>
    );
  }

  if (userData.userCount === 0) {
    return <div>No user matched your search!</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-lg font-semibold">
        <div className="flex-1">Profile Pic</div>
        <div className="flex-1">Full Name</div>
        <div className="flex-1">Username</div>
        <div className="flex-1">Followers</div>
      </div>
      {_.map(userData.users, (user) => {
        if (!_.isEmpty(user)) {
          return <UserRow key={user.login} user={user} />;
        }
      })}
    </div>
  );
};

export default UserDataTable;

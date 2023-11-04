import React, { useState } from "react";
import { debounce } from "lodash";

import UserDataTable from "./UserDataTable";

const UserSearch = () => {
  const [userName, setUserName] = useState("");

  const debouncedSetUserName = debounce(setUserName, 100);

  const handleOnChange = (e) => {
    debouncedSetUserName(e.target.value);
  };

  return (
    <div className="flex flex-col bg-slate-200 px-96 py-10 gap-10">
      <input
        placeholder="e.g John Doe"
        className="border-slate-600 rounded border p-1"
        onChange={handleOnChange}
      />
      <UserDataTable name={userName} />
    </div>
  );
};

export default UserSearch;

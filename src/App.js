import React from "react";
import UserSearch from "./components/UserSearch/UserSearch";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <UserSearch />
    </div>
  );
};

export default App;

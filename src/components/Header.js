import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col bg-red-800 text-center text-white p-10 gap-10">
      <div className="flex-1 text-4xl">Teleparty Project</div>
      <div className="flex-1 text-lg">
        Try searching Github Users by their name
      </div>
    </div>
  );
};

export default Header;

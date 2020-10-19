import React from 'react';

const Search = () => {
  return (
    <div className="mb4 searchinput">
      <input
        type="text"
        id="movieSearch"
        name="search"
        placeholder="Search"
        autoComplete="off"
      />
    </div>
  );
};

export default Search;

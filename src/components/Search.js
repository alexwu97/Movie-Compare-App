import React from 'react';

const Search = ({ onToggled }) => {
  return (
    <div>
      <div className="mt1 mb4 mx-auto" style={{ width: 400 }}>
        <input
          className=""
          style={{ width: 400 }}
          type="text"
          id="movieSearch"
          name="search"
          placeholder="Search"
          autoComplete="on"
        />
      </div>
      <label className="switch">
        <input type="checkbox" name="checkbox"></input>
        <span
          className="slider round"
          onClick={() => {
            onToggled();
          }}
        ></span>
      </label>
    </div>
  );
};

export default Search;

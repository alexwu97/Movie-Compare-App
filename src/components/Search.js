import React from 'react';

const Search = ({ onToggled, toggle }) => {
  if (toggle === 'on') {
    console.log(toggle);
    $('.compare').addClass('shadow');
  } else {
    console.log(toggle);
    $('.compare').removeClass('shadow');
  }
  return (
    <div className="flex">
      <div className="mt1 mb4 ml40 mr4" style={{ width: 400 }}>
        <input
          className=""
          style={{ width: 400 }}
          type="text"
          id="movieSearch"
          name="search"
          placeholder="Search"
          autoComplete="off"
        />
      </div>
      <div className="flex mt1">
        <div className="mt2 mx2 compare text-color-blue">
          Compare Two Movies
        </div>
        <label className="switch mt1">
          <input type="checkbox" name="checkbox"></input>
          <span
            className="slider round"
            onClick={() => {
              onToggled();
            }}
          ></span>
        </label>
      </div>
    </div>
  );
};

export default Search;

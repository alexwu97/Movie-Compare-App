import React from 'react';

const Search = ({ onToggled, toggle }) => {
  if (toggle === 'on') {
    console.log(toggle);
    $('.abcde').addClass('shadow');
  } else {
    console.log(toggle);
    $('.abcde').removeClass('shadow');
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
          autoComplete="on"
        />
      </div>
      <div>
        <div className="mt2 abcde text-color-white">compare two movies</div>
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

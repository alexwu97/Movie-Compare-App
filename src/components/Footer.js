import React from 'react';

const Footer = ({ onToggled, toggle }) => {
  if (toggle === 'on') {
    console.log(toggle);
    $('.compare').addClass('shadow');
  } else {
    console.log(toggle);
    $('.compare').removeClass('shadow');
  }
  return (
    <div>
      <div className="flex toggler">
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
      <div className=" credits small-font ">
        <span className="text-color-white mx2" style={{ opacity: 0.6 }}>
          Credits: This product uses the TMDb API but is not endorsed or
          certified by TMDb.
        </span>
        <img
          src="/src/static/images/tmdb_logo.png"
          style={{ width: 50 }}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default Footer;

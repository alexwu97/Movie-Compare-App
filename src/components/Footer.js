import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="mt2 mr2 compare text-color-blue">
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
      <div className="credits small-font ">
        <span className="text-color-white mx2" style={{ opacity: 0.6 }}>
          Credits: This product uses the TMDb API but is not endorsed or
          certified by TMDb.
        </span>
        <img
          className="logo"
          src="https://www.themoviedb.org/assets/2/v4/logos/312x276-primary-green-74212f6247252a023be0f02a5a45794925c3689117da9d20ffe47742a665c518.png"
          style={{ width: 50 }}
          alt=""
        ></img>
      </div>
    </div>
  );
};

Footer.propTypes = {
  toggle: PropTypes.string,
  onToggled: PropTypes.func
};

export default Footer;

import React from 'react';
import Display from './Display';
import PropTypes from 'prop-types';

class ScreenDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  //add boarder and shadows on displays when selected or hovered
  highlight = (selected, deselect) => {
    $(deselect).addClass('hovering');
    $(deselect).removeClass('border-coloring shift');
    $(selected).removeClass('hovering');
    $(selected).addClass('border-coloring shift');
  };

  render() {
    //when "two displays" are set to on
    if (this.props.toggle === 'on') {
      return (
        <div className="screen-display-container">
          <div
            className="screen-display-item mx-auto text-color-white border-coloring 1"
            onClick={() => {
              this.highlight(
                this.props.displayOne.class,
                this.props.displayTwo.class
              );
            }}
          >
            <Display
              information={this.props.infoOne}
              onSelected={this.props.onSelected}
              display={this.props.displayOne}
              toggle={this.props.toggle}
            />
          </div>
          <div
            className="screen-display-item mx-auto hovering text-color-white 2"
            onClick={() => {
              this.highlight(
                this.props.displayTwo.class,
                this.props.displayOne.class
              );
            }}
          >
            <Display
              information={this.props.infoTwo}
              onSelected={this.props.onSelected}
              display={this.props.displayTwo}
              toggle={this.props.toggle}
              onRemount={this.props.onRemount}
            />
          </div>
        </div>
      );
    }
    //when "single display" is on
    else {
      return (
        <div className="screen-display-single mx-auto text-color-white">
          <Display
            information={this.props.infoOne}
            onSelected={this.props.onSelected}
            display={this.props.displayOne}
            toggle={this.props.toggle}
          />
        </div>
      );
    }
  }
}

ScreenDisplay.propTypes = {
  toggle: PropTypes.string,
  displayOne: PropTypes.object,
  displayTwo: PropTypes.object,
  infoOne: PropTypes.object,
  infoTwo: PropTypes.object,
  onRemount: PropTypes.func,
  onSelected: PropTypes.func
};

export default ScreenDisplay;

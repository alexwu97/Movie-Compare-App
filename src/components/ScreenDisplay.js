import React from 'react';
import Display from './Display';

class ScreenDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return {
      movieInfoOne: props.infoOne,
      movieInfoTwo: props.infoTwo,
      toggle: props.toggle
    };
  }

  //update styles on displays when selected
  highlight = (selected, deselect) => {
    $(deselect).addClass('hovering');
    $(deselect).removeClass('border-coloring shift');
    $(selected).removeClass('hovering');
    $(selected).addClass('border-coloring shift');
  };

  render() {
    if (this.state.toggle === 'on') {
      return (
        <div className="screen-display-container margin10">
          <div
            className="screen-display-item mx-auto 1 text-color-white border-coloring"
            onClick={() => {
              this.highlight(
                this.props.displayOne.class,
                this.props.displayTwo.class
              );
            }}
          >
            <Display
              information={this.state.movieInfoOne}
              onSelected={this.props.onSelected}
              display={this.props.displayOne}
              toggle={this.state.toggle}
            />
          </div>
          <div
            className="screen-display-item mx-auto 2 hovering text-color-white"
            onClick={() => {
              this.highlight(
                this.props.displayTwo.class,
                this.props.displayOne.class
              );
            }}
          >
            <Display
              information={this.state.movieInfoTwo}
              onSelected={this.props.onSelected}
              display={this.props.displayTwo}
              toggle={this.state.toggle}
              onRemount={this.props.onRemount}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="py0 width50 margin10 mx-auto text-color-white">
          <Display
            information={this.state.movieInfoOne}
            onSelected={this.props.onSelected}
            display={this.props.displayOne}
            toggle={this.state.toggle}
          />
        </div>
      );
    }
  }
}

export default ScreenDisplay;

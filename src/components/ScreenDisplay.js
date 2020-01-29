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

  highlight = (selected, deselect) => {
    $(selected).removeClass('hovering');
    $(selected).addClass('border-coloring shift');
    $(deselect).addClass('hovering');
    $(deselect).removeClass('border-coloring shift');
  };

  render() {
    if (this.state.toggle === 'on') {
      return (
        <div className="flex">
          <div
            className="py0 relative width40 mx-auto 1 border-coloring text-color-white"
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
            className="py0 relative width40 mx-auto 2 hovering text-color-white"
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
        <div className="py0 relative width50 mx-auto text-color-white">
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

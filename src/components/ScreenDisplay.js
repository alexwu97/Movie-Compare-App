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
    $(selected).removeClass('border hovering');
    $(selected).addClass('border-coloring');
    $(deselect).addClass('border hovering');
    $(deselect).removeClass('border-coloring');
  };

  render() {
    if (this.state.toggle === 'on') {
      return (
        <div className="flex">
          <div
            className="border relative width3 mx-auto 1 border-coloring"
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
            className="border relative width3 mx-auto 2 hovering"
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
        <div className="flex border relative max-width-4 mx-auto">
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

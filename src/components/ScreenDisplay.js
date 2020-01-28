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

  render() {
    if (this.state.toggle === 'on') {
      return (
        <div>
          <Display
            information={this.state.movieInfoOne}
            onSelected={this.props.onSelected}
            display={this.props.displayOne}
            toggle={this.state.toggle}
          />
          <Display
            information={this.state.movieInfoTwo}
            onSelected={this.props.onSelected}
            display={this.props.displayTwo}
            toggle={this.state.toggle}
          />
        </div>
      );
    } else {
      return (
        <Display
          information={this.state.movieInfoOne}
          onSelected={this.props.onSelected}
          display={this.props.displayOne}
          toggle={this.state.toggle}
        />
      );
    }
  }
}

export default ScreenDisplay;

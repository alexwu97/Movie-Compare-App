import React from 'react';
import Display from './Display';

class ScreenDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOne: { no: '1', selection: true },
      displayTwo: { no: '2', selection: false }
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      movieInfo: props.info,
      toggle: props.toggle
    };
  }

  onSelected = displayer => {
    if ((displayer.no === '1') & (displayer.selection === false)) {
      console.log(displayer);
      this.setState({
        displayOne: { no: '1', selection: true },
        displayTwo: { no: '2', selection: false }
      });
    } else if ((displayer.no === '2') & (displayer.selection === false)) {
      console.log(displayer);
      this.setState({
        displayOne: { no: '1', selection: false },
        displayTwo: { no: '2', selection: true }
      });
    }
  };

  render() {
    if (this.state.toggle === 'on') {
      return (
        <div>
          <Display
            information={this.state.movieInfo}
            onSelected={this.onSelected}
            display={this.state.displayOne}
          />
          <Display
            information={this.state.movieInfo}
            onSelected={this.onSelected}
            display={this.state.displayTwo}
          />
        </div>
      );
    } else {
      return (
        <Display
          information={this.state.movieInfo}
          onSelected={this.onSelected}
          display={this.state.displayOne}
        />
      );
    }
  }
}

export default ScreenDisplay;

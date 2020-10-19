import React from 'react';
import Display from './Display';
import PropTypes from 'prop-types';

class DisplayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  //add boarder and shadows on displays when selected or hovered
  updateDisplayHighlight = (displayToActivate, displayToDeactivate) => {
    $(displayToDeactivate).addClass('display-popup');
    $(displayToDeactivate).removeClass('display-border-highlight');
    $(displayToActivate).removeClass('display-popup');
    $(displayToActivate).addClass('display-border-highlight');
  };

  render() {
    //when "two displays" are set to on
    if (this.props.showTwoDisplays === 'on') {
      return (
        <div className="display-container">
          <div
            className="display-item mx-auto text-color-white display-border-highlight"
            id="displayOne"
            onClick={() => {
              this.props.activateDisplay(this.props.displayOne);
              this.updateDisplayHighlight(
                this.props.displayOne.elementID,
                this.props.displayTwo.elementID
              );
            }}
          >
            <Display
              information={this.props.infoOne}
              display={this.props.displayOne}
              onRemount={this.props.onRemount}
            />
          </div>
          <div
            className="display-item mx-auto display-popup text-color-white"
            id="displayTwo"
            onClick={() => {
              this.props.activateDisplay(this.props.displayTwo);
              this.updateDisplayHighlight(
                this.props.displayTwo.elementID,
                this.props.displayOne.elementID
              );
            }}
          >
            <Display
              information={this.props.infoTwo}
              display={this.props.displayTwo}
              onRemount={this.props.onRemount}
            />
          </div>
        </div>
      );
    }
    //when "single display" is on
    else {
      return (
        <div className="display-single mx-auto text-color-white">
          <Display
            information={this.props.infoOne}
            display={this.props.displayOne}
            onRemount = {this.props.onRemount}
          />
        </div>
      );
    }
  }
}

DisplayContainer.propTypes = {
  showTwoDisplays: PropTypes.string,
  displayOne: PropTypes.object,
  displayTwo: PropTypes.object,
  infoOne: PropTypes.object,
  infoTwo: PropTypes.object,
  onRemount: PropTypes.func,
  activateDisplay: PropTypes.func
};

export default DisplayContainer;

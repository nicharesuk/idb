import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import './ModalContent.css';

class ModalContent extends Component {

  render() {
    return (
      <div className="modalContentContainer">
        <Icon
          className="modalContentCloseIcon"
          onClick={this.props.onClose}
          size="huge"
          name="remove" />
        <div className="modalContentContent">
          <Image
            wrapped
            height="588px"
            width="402px"
            src={this.props.imageURL} />
          <div>
            <div>
              {`Title: ${this.props.title}`}
            </div>
            <div>
              {`Length: ${this.props.units}`}
            </div>
            <div>
              {`Year Started: ${this.props.year}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  title: PropTypes.string,
  imageURL: PropTypes.string,
  year: PropTypes.number,
  units: PropTypes.number,
  isManga: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ModalContent;

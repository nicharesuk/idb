import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import './ModalContent.css';

class ModalContent extends Component {

  render() {
    const { image, title, units, started, status, score } = this.props.dataObject;
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
            src={image} />
          <div className="modalContentData">
            <p>
              {`Title: ${title}`}
            </p>
            <p>
              {`Length: ${units}`}
            </p>
            <p>
              {`Year Started: ${started}`}
            </p>
            <p>
              {`Status: ${status}`}
            </p>
            <p>
              {`Score: ${score[0]}`}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  dataObject: PropTypes.object,
  isManga: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ModalContent;

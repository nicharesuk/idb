import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import './ModalContent.css';

class ModalContent extends Component {

  render() {
    const { image, title, units, started } = this.props.dataObject;
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
          <div>
            <div>
              {`Title: ${title}`}
            </div>
            <div>
              {`Length: ${units}`}
            </div>
            <div>
              {`Year Started: ${started}`}
            </div>
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

import React, { Component } from 'react';
import styles from './ModalInstance.scss';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ModalContent from './ModalContent';

class ModalInstance extends Component {

  render() {
    return (
      <Modal
        className={styles.modal}
        open={this.props.open}
        onClose={this.props.onClose}
        size="fullscreen">
        <ModalContent
          id={this.props.id}
          type={this.props.type}
          onClose={this.props.onClose} />
      </Modal>
    );
  }
}

ModalInstance.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
}

export default ModalInstance;

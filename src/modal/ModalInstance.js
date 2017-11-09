import React, { Component } from 'react';
import styles from './ModalInstance.scss';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ModalContent from './ModalContent';
import queryString from 'query-string';

class ModalInstance extends Component {

  render() {
    const params = queryString.parse(window.location.search);
    console.log(window.location);
    const openModal = !!params.id && !!params.type;
    return (
      <Modal
        className={styles.modal}
        open={openModal}
        onClose={this.props.onClose}
        size="fullscreen">
        <ModalContent
          id={params.id}
          type={params.type}
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

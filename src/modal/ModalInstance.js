import React, { Component } from 'react';
import styles from './ModalInstance.scss';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ModalContent from './ModalContent';
import queryString from 'query-string';
import { closeModalURL } from '../shared/Utilities';

class ModalInstance extends Component {

  onClose = () => {
    this.context.router.history.push(closeModalURL());
  }

  render() {
    const params = queryString.parse(window.location.search);
    const openModal = !!params.id && !!params.type;
    return (
      <Modal
        className={styles.modal}
        open={openModal}
        onClose={this.onClose}
        size="fullscreen">
        <ModalContent
          id={params.id}
          type={params.type}
          onClose={this.onClose} />
      </Modal>
    );
  }
}

ModalInstance.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

ModalInstance.propTypes = {
  pageType: PropTypes.string,
}

export default ModalInstance;

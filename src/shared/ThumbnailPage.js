import React, { Component } from 'react';
import styles from './ThumbnailPage.scss';
import ThumbnailCard from './ThumbnailCard';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ModalContent from './ModalContent';

class ThumbnailPage extends Component {
  state = {
    modalOpen: false,
    selectedIndex: 0,
  }

  openModalAction = (index) => {
    this.setState({
      modalOpen: true,
      selectedIndex: index,
    });
  }

  closeModalAction = () => {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Modal
          className={styles.modal}
          open={this.state.modalOpen}
          onClose={this.closeModalAction}
          size="fullscreen">
          <ModalContent
            dataObject={this.props.data[this.state.selectedIndex]}
            type={this.props.type}
            onClose={this.closeModalAction} />
        </Modal>
        {this.props.data.map((instance, index) => (
          <div
            onClick={() => this.openModalAction(index)}
            key={`thumbnail-component-${index}`}>
            <ThumbnailCard
              title={instance.title}
              picture={instance.picture}
              score={instance.score}
              subInfo_1={instance.subInfo_1}
              subInfo_2={instance.subInfo_2} />
          </div>
        ))}
      </div>
    );
  }
}

ThumbnailPage.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
}

export default ThumbnailPage;

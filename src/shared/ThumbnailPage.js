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

    const moreData = [
      ...this.props.data,
      ...this.props.data,
      ...this.props.data,
      ...this.props.data,
      ...this.props.data,
      ...this.props.data,
      ...this.props.data,
    ];

    return (
      <div className={styles.container}>
        <Modal
          className={styles.modal}
          open={this.state.modalOpen}
          onClose={this.closeModalAction}
          size="fullscreen">
          <ModalContent
            dataObject={moreData[this.state.selectedIndex]}
            type={this.props.type}
            onClose={this.closeModalAction} />
        </Modal>
        {moreData.map((show, index) => (
          <div
            onClick={() => this.openModalAction(index)}
            key={`thumbnail-component-${index}`}>
            <ThumbnailCard
              title={show.title}
              picture={show.picture}
              subInfo_1={show.subInfo_1}
              subInfo_2={show.subInfo_2}
              isManga={this.props.isManga}/>
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

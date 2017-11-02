import React, { Component } from 'react';
import styles from './ThumbnailPage.scss';
import ThumbnailCard from './ThumbnailCard';
import PropTypes from 'prop-types';
import { Modal, Loader } from 'semantic-ui-react';
import ModalContent from '../modal/ModalContent';

const THUMBNAIL_WIDTH = 134 + 20;

class ThumbnailPage extends Component {
 
  state = {
    modalOpen: false,
    selectedIndex: 0,
    windowWidth: '0',
    windowHeight: '0',
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight});
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
    if (this.props.loading) {
      return (
        <div className={styles.emptyContainer}>
          <Loader
            size="massive"
            active
            inverted>
            Loading
          </Loader>
        </div>
      );
    }
    if (!this.props.data.length) {
      return (
        <div className={styles.emptyContainer}>
          <h1 className={styles.noResults}>No Results</h1>
        </div>
      );
    }
    const numGhosts = Math.floor(this.state.windowWidth / THUMBNAIL_WIDTH);
    const ghosts = [];
    for (let i = 0; i < numGhosts; i++) {
      ghosts.push(<div key={`ghost-${i}`} className={styles.ghost}></div>);
    }
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
        <div className={styles.items}>
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
          {ghosts}
        </div>
      </div>
    );
  }
}

ThumbnailPage.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  data: PropTypes.array,
}

export default ThumbnailPage;

import React, { Component } from 'react';
import './ThumbnailPage.css';
import ThumbnailCard from './ThumbnailCard';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ModalContent from './ModalContent';

class ThumbnailPage extends Component {
  state = {
    modalOpen: false,
    selectedIndex: 0,
  };

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
      <div className="thumbnailPageContainer">
        <Modal
          basic
          dimmer="blurring"
          className="modalStyle"
          open={this.state.modalOpen}
          onClose={this.closeModalAction}
          size="fullscreen">
          <ModalContent
            title={this.props.data[this.state.selectedIndex].title}
            imageURL={this.props.data[this.state.selectedIndex].imageURL}
            year={this.props.data[this.state.selectedIndex].year}
            units={this.props.data[this.state.selectedIndex].units}
            isManga={this.props.isManga}
            onClose={this.closeModalAction} />
        </Modal>
        {this.props.data.map((show, index) => (
          <div
            onClick={() => this.openModalAction(index)}
            key={`thumbnail-component-${index}`}>
            <ThumbnailCard
              title={show.title}
              imageURL={show.imageURL}
              year={show.year}
              units={show.units}
              isManga={this.props.isManga}/>
          </div>
        ))}
      </div>
    );
  }
}

ThumbnailPage.propTypes = {
  isManga: PropTypes.bool,
  data: PropTypes.array,
}

export default ThumbnailPage;

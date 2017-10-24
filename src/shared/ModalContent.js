import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import styles from './ModalContent.scss';
import ShowModalContent from '../shows/ShowModalContent';
import CharacterModalContent from '../characters/CharacterModalContent';
import PersonModalContent from '../people/PersonModalContent';
import MangaModalContent from '../manga/MangaModalContent';

class ModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      dataObject: props.dataObject,
    };
  }

  getContentNode = () => {
    if        (this.state.type === "shows") {
      return <ShowModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "characters") {
      return <CharacterModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "people") {
      return <PersonModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "manga") {
      return <MangaModalContent dataObject={this.state.dataObject} />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            fluid
            src={this.state.dataObject.picture} />
        </div>
        <div className={styles.content}>
          {this.getContentNode()}
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  dataObject: PropTypes.object,
  type: PropTypes.string,
  onClose: PropTypes.func,
}

export default ModalContent;

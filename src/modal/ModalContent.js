import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import styles from './ModalContent.scss';
import AnimeModalContent from '../anime/AnimeModalContent';
import CharacterModalContent from '../characters/CharacterModalContent';
import ActorModalContent from '../actors/ActorModalContent';
import MangaModalContent from '../manga/MangaModalContent';
import { getSingleModel } from '../shared/Requests';
import defaultImage from '../shared/DefaultImage';

class ModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      dataObject: null,
    };
  }

  componentWillMount = () => {
    this.getModelData(this.props.type, this.props.id);
  }

  getModelData = (type, id) => {
    getSingleModel(
      type,
      (dataObject) => this.setState({type, dataObject}),
      id);
  }

  changeContent = (type, index) => {
    const id = this.state.dataObject.included.filter(obj => obj.type === type)[index].id;
    this.getModelData(type, id);
  }

  getContentNode = () => {
    if        (this.state.type === "animes") {
      return <AnimeModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.state.type === "characters") {
      return <CharacterModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.state.type === "actors") {
      return <ActorModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.state.type === "mangas") {
      return <MangaModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.dataObject) {
      return <div className={styles.container}></div>
    }
    return (
      <div className={styles.container}>
        <Icon 
          className={styles.closeIcon} 
          onClick={this.props.onClose} 
          size="large" 
          name="remove" />
        <div className={styles.imageContainer}>
          <Image
            fluid
            src={this.state.dataObject.picture ? this.state.dataObject.picture : defaultImage} />
        </div>
        <div className={styles.content}>
          {this.getContentNode()}
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
}

export default ModalContent;

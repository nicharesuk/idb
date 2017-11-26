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
import { changeModalURL } from '../shared/Utilities';

class ModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataObject: null,
    };
  }

  componentWillMount = () => {
    this.getModelData(this.props.type, this.props.id);
  }

  componentWillReceiveProps = (nextProps) => {
    this.getModelData(nextProps.type, nextProps.id);
  }

  getModelData = (type, id) => {
    getSingleModel(
      type,
      (dataObject) => this.setState({type, dataObject}),
      id);
  }

  changeContent = (type, index) => {
    const id = this.state.dataObject.included.filter(obj => obj.type === type)[index].id;
    this.context.router.history.push(changeModalURL(id, type));
  }

  getContentNode = () => {
    if        (this.props.type === "animes") {
      return <AnimeModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.props.type === "characters") {
      return <CharacterModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.props.type === "actors") {
      return <ActorModalContent dataObject={this.state.dataObject} onChange={this.changeContent} />
    } else if (this.props.type === "mangas") {
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

ModalContent.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

ModalContent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
}

export default ModalContent;

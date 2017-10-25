import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import styles from './ModalContent.scss';
import ShowModalContent from '../shows/ShowModalContent';
import CharacterModalContent from '../characters/CharacterModalContent';
import PersonModalContent from '../people/PersonModalContent';
import MangaModalContent from '../manga/MangaModalContent';
import { getSingleModel } from './Requests';

class ModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      dataObject: null,
    };
  }

  componentWillMount = () => {
    getSingleModel(
      this.props.type,
      (dataObject) => this.setState({dataObject}),
      this.props.dataObject.id);
  }

  getContentNode = () => {
    if        (this.state.type === "animes") {
      return <ShowModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "characters") {
      return <CharacterModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "actors") {
      return <PersonModalContent dataObject={this.state.dataObject} />
    } else if (this.state.type === "mangas") {
      return <MangaModalContent dataObject={this.state.dataObject} />
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.dataObject) {
      return <div></div>
    }
    return (
      <div className={styles.container}>
        <Icon 
          className={styles.closeIcon} 
          onClick={this.props.onClose} 
          size="huge" 
          name="remove" />
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

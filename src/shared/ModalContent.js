import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import styles from './ModalContent.scss';
import ShowDetails from '../shows/ShowDetails';
import CharacterDetails from '../characters/CharacterDetails';
import PersonDetails from '../people/PersonDetails';
import MangaDetails from '../manga/MangaDetails';

class ModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      dataObject: props.dataObject,
    };
  }

  onChangeContent = (type, dataObject) => {
    this.setState({
      type,
      dataObject,
    });
  }

  getContentNode = () => {
    if        (this.state.type === "shows") {
      return <ShowDetails dataObject={this.state.dataObject} onChangeContent={this.onChangeContent} />
    } else if (this.state.type === "characters") {
      return <CharacterDetails dataObject={this.state.dataObject} onChangeContent={this.onChangeContent} />
    } else if (this.state.type === "people") {
      return <PersonDetails dataObject={this.state.dataObject} onChangeContent={this.onChangeContent} />
    } else if (this.state.type === "manga") {
      return <MangaDetails dataObject={this.state.dataObject} onChangeContent={this.onChangeContent} />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Icon
          className={styles.closeIcon}
          onClick={this.props.onClose}
          size="huge"
          name="remove" />
        <div className={styles.content}>
          <Image
            wrapped
            height="588px"
            width="402px"
            src={this.state.dataObject.image} />
          <div className={styles.data}>
            {this.getContentNode()}
          </div>
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

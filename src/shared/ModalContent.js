import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, List } from 'semantic-ui-react';
import styles from './ModalContent.scss';
import ShowDetails from '../shows/ShowDetails';
import CharacterDetails from '../characters/CharacterDetails';
import PersonDetails from '../people/PersonDetails';
import MangaDetails from '../manga/MangaDetails';
import ScrollableList from './ScrollableList';

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
    const characterData = [
      {name: 'Character1'},
      {name: 'Character2'},
      {name: 'Character3'},
      {name: 'Character4'},
      {name: 'Character5'},
      {name: 'Character6'},
      {name: 'Character7'},
      {name: 'Character8'},
      {name: 'Character9'},
      {name: 'Character10'},
      {name: 'Character11'},
      {name: 'Character12'},
    ];

    const synopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            fluid
            src={this.state.dataObject.picture} />
        </div>
        <div className={styles.content}>
          <div className={styles.data}>
            <div className={styles.title}>
              Title
            </div>
            <div className={styles.details}>
              <div>2017</div><div>•</div><div>Episodes: 20</div><div>•</div><div>Action / Fantasy</div>
            </div>
            <div className={styles.synopsis}>
              {synopsis}
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.listsContainer}>
            <ScrollableList data={characterData} title="Characters" />
            <ScrollableList data={characterData} title="Voice Actors" />
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

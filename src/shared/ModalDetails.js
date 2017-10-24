import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalDetails.scss';
import ScrollableList from './ScrollableList';

class ModalDetails extends Component {

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
    );
  }
}

ModalDetails.propTypes = {}

export default ModalDetails;

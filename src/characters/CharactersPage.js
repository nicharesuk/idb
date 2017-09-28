import React, { Component } from 'react';
import './CharactersPage.css';
import data from './FakeCharactersData';
import ThumbnailPage from '../shared/ThumbnailPage';

class CharactersPage extends Component {
  render() {
    return (
      <ThumbnailPage
        isManga={false}
        data={data.map(character => {
          return {
            ...character,
            title: character.name,
            started: character.nameJapanese,
          }
        })} />
    );
  }
}

export default CharactersPage;

import React, { Component } from 'react';
// import styles from './CharactersPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';

class CharactersPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('characters', (data) => this.setState({data}));
  }

  render() {
    return (
      <ThumbnailPage
        type="characters"
        data={this.state.data.map(character => {
          return {
            ...character,
            title: character.name,
            subInfo_1: character.japanese_name,
          }
        })} />
    );
  }
}

export default CharactersPage;

import React, { Component } from 'react';
// import styles from './CharactersPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class CharactersPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios('api/characters').then((response) => {
      this.setState({
        data: response.data.objects,
      });
    });
  }

  render() {
    if (!this.state.data) {
      return <div></div>
    }
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

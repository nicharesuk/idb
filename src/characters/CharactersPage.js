import React, { Component } from 'react';
// import styles from './CharactersPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class CharactersPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios({
      method: 'get',
      url: 'api/characters',
      headers: {'Accept': 'application/vnd.api+json'}
    }).then((response) => {
      const data = response.data.data.map(obj => {
        return {
          id: obj.id,
          type: obj.type,
          ...obj.relationships,
          ...obj.attributes,
        }
      });
      this.setState({
        data,
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

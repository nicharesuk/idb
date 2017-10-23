import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class MangaPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios({
      method: 'get',
      url: 'api/mangas',
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
        type="manga"
        data={this.state.data.map(manga => {
          return {
            ...manga,
            subInfo_1: `${manga.year}`,
            subInfo_2: manga.num_chapters,
          }
        })} />
    );
  }
}

export default MangaPage;

import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class MangaPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios('api/mangas').then((response) => {
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

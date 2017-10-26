import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import getStartYear from '../shared/GetStartYear';

class MangaPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('mangas', (data) => this.setState({data}));
  }

  render() {
    return (
      <ThumbnailPage
        type="mangas"
        data={this.state.data.map(manga => {
          const subInfo_2 = manga.num_chapters === "Unknown" ? "" : `${manga.num_chapters} chapters`
          return {
            ...manga,
            subInfo_1: `${getStartYear(manga.published)}`,
            subInfo_2: subInfo_2,
          }
        })} />
    );
  }
}

export default MangaPage;

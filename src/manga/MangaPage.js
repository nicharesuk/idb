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
    if (!this.state.data) {
      return <div></div>
    }
    return (
      <ThumbnailPage
        type="manga"
        data={this.state.data.map(manga => {
          return {
            ...manga,
            subInfo_1: `${getStartYear(manga.published)}`,
            subInfo_2: `${manga.num_chapters} chapters`,
          }
        })} />
    );
  }
}

export default MangaPage;

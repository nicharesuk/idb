import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';

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
            subInfo_1: `${manga.year}`,
            subInfo_2: manga.num_chapters,
          }
        })} />
    );
  }
}

export default MangaPage;

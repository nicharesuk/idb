import React, { Component } from 'react';
import './MangaPage.css';
import data from './FakeMangaData';
import ThumbnailPage from '../shared/ThumbnailPage';

class MangaPage extends Component {
  render() {
    return (
      <ThumbnailPage
        isManga={true}
        data={data} />
    );
  }
}

export default MangaPage;

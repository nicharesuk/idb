import React, { Component } from 'react';
import './MangaPage.css';
import data from './FakeMangaData';
import ThumbnailPage from '../shared/ThumbnailPage';

class MangaPage extends Component {
  render() {
    return (
      <ThumbnailPage
        isManga={true}
        data={data.map(manga => {
          return {
            ...manga,
            units: typeof manga.volumes === "number" ? manga.volumes : undefined,
            started: manga.published.replace(/  +/g, ' ').split(' ')[2],
          }
        })} />
    );
  }
}

export default MangaPage;

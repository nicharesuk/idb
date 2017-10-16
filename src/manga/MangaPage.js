import React, { Component } from 'react';
// import styles from './MangaPage.scss';
import data from './FakeMangaData';
import ThumbnailPage from '../shared/ThumbnailPage';

class MangaPage extends Component {
  render() {
    return (
      <ThumbnailPage
        type="manga"
        data={data.map(manga => {
          return {
            ...manga,
            subInfo_1: manga.published.replace(/  +/g, ' ').split(' ')[2],
            subInfo_2: typeof manga.volumes === "number" ? manga.volumes : undefined,
          }
        })} />
    );
  }
}

export default MangaPage;

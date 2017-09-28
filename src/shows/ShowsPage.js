import React, { Component } from 'react';
import './ShowsPage.css';
import data from './FakeShowData';
import ThumbnailPage from '../shared/ThumbnailPage';

class ShowsPage extends Component {
  render() {
    return (
      <ThumbnailPage
        type="shows"
        data={data.map(show => {
          return {
            ...show,
            subInfo_1: show.aired.replace(/  +/g, ' ').split(' ')[2],
            subInfo_2: show.episodes,
          }
        })} />
    );
  }
}

export default ShowsPage;

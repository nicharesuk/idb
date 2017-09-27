import React, { Component } from 'react';
import './ShowsPage.css';
import data from './FakeShowData';
import ThumbnailPage from '../shared/ThumbnailPage';

class ShowsPage extends Component {
  render() {
    return (
      <ThumbnailPage
        isManga={false}
        data={data} />
    );
  }
}

export default ShowsPage;

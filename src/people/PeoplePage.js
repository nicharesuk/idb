import React, { Component } from 'react';
import './PeoplePage.css';
import data from './FakePeopleData';
import ThumbnailPage from '../shared/ThumbnailPage';

class PeoplePage extends Component {
  render() {
    return (
      <ThumbnailPage
        isManga={false}
        data={data.map(person => {
          return {
            ...person,
            title: person.name,
            started: person.birthday,
          }
        })} />
    );
  }
}

export default PeoplePage;

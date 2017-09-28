import React, { Component } from 'react';
import './PeoplePage.css';
import data from './FakePeopleData';
import ThumbnailPage from '../shared/ThumbnailPage';

class PeoplePage extends Component {
  render() {
    return (
      <ThumbnailPage
        type="people"
        data={data.map(person => {
          return {
            ...person,
            title: person.name,
            subInfo_1: person.birthday,
          }
        })} />
    );
  }
}

export default PeoplePage;

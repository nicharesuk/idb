import React, { Component } from 'react';
// import styles from './PeoplePage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';

class PeoplePage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('actors', (data) => this.setState({data}));
  }

  render() {
    return (
      <ThumbnailPage
        type="actors"
        data={this.state.data.map(person => {
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

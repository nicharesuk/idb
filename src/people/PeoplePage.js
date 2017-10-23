import React, { Component } from 'react';
// import styles from './PeoplePage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class PeoplePage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios('api/actors').then((response) => {
      this.setState({
        data: response.data.objects,
      });
      console.log(response.data.objects);
    });
  }

  render() {
    if (!this.state.data) {
      return <div></div>
    }
    return (
      <ThumbnailPage
        type="people"
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

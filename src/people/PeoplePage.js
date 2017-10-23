import React, { Component } from 'react';
// import styles from './PeoplePage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class PeoplePage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios({
      method: 'get',
      url: 'api/actors',
      headers: {'Accept': 'application/vnd.api+json'}
    }).then((response) => {
      const data = response.data.data.map(obj => {
        return {
          id: obj.id,
          type: obj.type,
          ...obj.relationships,
          ...obj.attributes,
        }
      });
      this.setState({
        data,
      });
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

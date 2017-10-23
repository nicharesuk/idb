import React, { Component } from 'react';
// import styles from './ShowsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class ShowsPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios({
      method: 'get',
      url: 'api/animes',
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
        type="shows"
        data={this.state.data.map(show => {
          return {
            ...show,
            subInfo_1: `${show.year}`,
            subInfo_2: show.num_episodes,
          }
        })} />
    );
  }
}

export default ShowsPage;

import React, { Component } from 'react';
// import styles from './ShowsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import axios from 'axios';

class ShowsPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    axios('api/animes').then((response) => {
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

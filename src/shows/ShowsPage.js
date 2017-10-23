import React, { Component } from 'react';
// import styles from './ShowsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';

class ShowsPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('animes', (data) => this.setState({data}));
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

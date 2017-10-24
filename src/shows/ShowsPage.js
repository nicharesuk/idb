import React, { Component } from 'react';
// import styles from './ShowsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import getStartYear from '../shared/GetStartYear';

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
            subInfo_1: `${getStartYear(show.aired)}`,
            subInfo_2: `${show.num_episodes} episodes`,
          }
        })} />
    );
  }
}

export default ShowsPage;

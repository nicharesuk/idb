import React, { Component } from 'react';
// import styles from './ShowsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import getStartYear from '../shared/GetStartYear';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

const filters = [
  {
    name: "Name",
    field: "genre",
    op: "has",
    values: [
      {
        name: "Action",
        value: "Action",
      },
    ],
  },
];

const sorts = [
  {
    name: "Score",
    field: "score",
  },
  {
    name: "Title",
    field: "title",
  },
];

class ShowsPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('animes', (data) => this.setState({data}));
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          filters={filters}
          sorts={sorts}
          pages={this.props.pages} />
        <ThumbnailPage
          type="animes"
          data={this.state.data.map(show => {
            return {
              ...show,
              subInfo_1: `${getStartYear(show.aired)}`,
              subInfo_2: `${show.num_episodes} episodes`,
            }
          })} />
      </div>
    );
  }
}

ShowsPage.propTypes = {
  pages: PropTypes.array,
}

export default ShowsPage;

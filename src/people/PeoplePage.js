import React, { Component } from 'react';
// import styles from './PeoplePage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

const filters = [
  {
    name: "Language",
    field: "genre",
    op: "has",
    values: [
      {
        name: "Japanese",
        value: "Japanese",
      },
      {
        name: "English",
        value: "English",
      },
    ],
  },
];

const sorts = [
  {
    name: "Name",
    field: "name",
  },
];

class PeoplePage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('actors', (data) => this.setState({data}));
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          filters={filters}
          sorts={sorts}
          pages={this.props.pages} />
        <ThumbnailPage
          type="actors"
          data={this.state.data.map(person => {
            return {
              ...person,
              title: person.name,
              subInfo_1: person.birthday,
            }
          })} />
      </div>
    );
  }
}

PeoplePage.propTypes = {
  pages: PropTypes.array,
}

export default PeoplePage;

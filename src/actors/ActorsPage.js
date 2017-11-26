import React, { Component } from 'react';
// import styles from './ActorsPage.scss';
import PropTypes from 'prop-types';
import FiltersContainer from '../shared/FiltersContainer';

// TODO: Fill in all filters and sorts for this page

const filters = [
  {
    name: "Language",
    field: "language",
    op: "eq",
    values: [
      {
        name: "All",
        value: "",
      },
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

class ActorsPage extends Component {

  handleModel = (actor) => {
    return {
      ...actor,
      title: actor.name,
      subInfo_1: actor.birthday,
    }
  }

  render() {
    return (
      <FiltersContainer
        {...this.props}
        filters={filters}
        sorts={sorts}
        type="actors"
        handleModel={this.handleModel} />
    );
  }
}

ActorsPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
  page: PropTypes.number,
}

export default ActorsPage;

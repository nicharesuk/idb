import React, { Component } from 'react';
// import styles from './AnimePage.scss';
import getStartYear from '../shared/GetStartYear';
import PropTypes from 'prop-types';
import FiltersContainer from '../shared/FiltersContainer';

// TODO: Fill in all filters and sorts for this page

const filters = [
  {
    name: "Genre",
    field: "genre",
    op: "like",
    values: [
      {
        name: "All",
        value: "",
      },
      {
        name: "Action",
        value: "Action",
      },

      {
        name: "Comedy",
        value: "Comedy",
      },

      {
        name: "Romance",
        value: "Romance",
      },

      {
        name: "Mystery",
        value: "Mystery",
      },

      {
        name: "Magic",
        value: "Magic",
      },

      {
        name: "Fantasy",
        value: "Fantasy",
      },

      {
        name: "Sci-Fi",
        value: "Sci-Fi",
      },
    ],
  },
  {
    name: "Status",
    field: "status",
    op: "eq",
    values: [
      {
        name: "All",
        value: "",
      },
      {
        name: "Finished",
        value: "Finished Airing",
      },
      {
        name: "Airing",
        value: "Currently Airing",
      },
    ],
  },
];

const sorts = [
  {
    name: "Title",
    field: "title",
  },
  {
    name: "Score",
    field: "score",
  },
];

class AnimePage extends Component {

  handleModel = (anime) => {
    return {
      ...anime,
      subInfo_1: `${getStartYear(anime.aired)}`,
      subInfo_2: `${anime.num_episodes} episodes`,
    }
  }

  render() {
    return (
      <FiltersContainer
        {...this.props}
        filters={filters}
        sorts={sorts}
        type="animes"
        handleModel={this.handleModel} />
    );
  }
}

AnimePage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default AnimePage;

import React, { Component } from 'react';
// import styles from './MangaPage.scss
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
        value: "Finished",
      },
      {
        name: "Publishing",
        value: "Publishing",
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

class MangaPage extends Component {

  handleModel = (manga) => {
    const subInfo_2 = manga.num_chapters === "Unknown" ? "" : `${manga.num_chapters} chapters`
    return {
      ...manga,
      subInfo_1: `${getStartYear(manga.published)}`,
      subInfo_2: subInfo_2,
    }
  }

  render() {
    return (
      <FiltersContainer
        {...this.props}
        filters={filters}
        sorts={sorts}
        type="mangas"
        handleModel={this.handleModel} />
    );
  }
}

MangaPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
}


export default MangaPage;

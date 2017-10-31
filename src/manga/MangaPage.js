import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import getStartYear from '../shared/GetStartYear';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

// TODO: Fill in all filters and sorts for this page

const filters = [
  {
    name: "Genre",
    field: "genre",
    op: "has",
    values: [
      {
        name: "All",
        value: "",
      },
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

class MangaPage extends Component {

  state = {
    data: [],
    filters: filters.map(filter => ({activeValue: 0, ...filter})),
    activeSortIndex: 0,
  }

  componentWillMount = () => {
    this.getInstances({});
  }

  getActiveFilters = (filters) => {
    return filters.filter(filter => filter.activeValue !== 0).map(filter => ({
      name: filter.name,
      field: filter.field,
      op: filter.op,
      value: filter.values[filter.activeValue].value,
    }));
  }

  getInstances = ({newSort, newFilters}) => {
    const sort = newSort !== undefined ? newSort : sorts[this.state.activeSortIndex].field;
    const filters = newFilters ? newFilters : this.getActiveFilters(this.state.filters); 
    getModelData({
      model: 'mangas',
      sort,
      filters,
      callback: (data) => this.setState({data}),
    });
  }

  changeSort = (activeSortIndex) => {
    this.setState({activeSortIndex, data: []});
    this.getInstances({newSort: sorts[activeSortIndex].field});
  }

  updateFilters = (filterIndex, valueIndex) => {
    const newFilters = [...this.state.filters];
    newFilters[filterIndex].activeValue = valueIndex;
    this.setState({filters: newFilters, data: []});
    this.getInstances({
      newFilters: this.getActiveFilters(newFilters),
    });
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          filters={this.state.filters}
          updateFilters={this.updateFilters}
          sorts={sorts}
          changeSort={this.changeSort}
          activeSortIndex={this.state.activeSortIndex}
          pages={this.props.pages}
          searchText={this.props.searchText}
          updateSearch={this.props.updateSearch}
          handleSubmit={this.props.handleSubmit} />
        <ThumbnailPage
          type="mangas"
          data={this.state.data.map(manga => {
            const subInfo_2 = manga.num_chapters === "Unknown" ? "" : `${manga.num_chapters} chapters`
            return {
              ...manga,
              subInfo_1: `${getStartYear(manga.published)}`,
              subInfo_2: subInfo_2,
            }
          })} />
      </div>
    );
  }
}

MangaPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
}


export default MangaPage;

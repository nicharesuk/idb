import React, { Component } from 'react';
// import styles from './ActorsPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

// TODO: Fill in all filters and sorts for this page

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
      model: 'animes',
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
  searchText: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default PeoplePage;

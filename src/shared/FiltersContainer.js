import React, { Component } from 'react';
import ThumbnailPage from './ThumbnailPage';
import { getModelData } from './Requests';
import NavMenu from './NavMenu';
import PropTypes from 'prop-types';

class FiltersContainer extends Component {

  state = {
    data: [],
    filters: this.props.filters.map(filter => ({activeValue: 0, ...filter})),
    activeSortIndex: 0,
    loading: true,
  }

  componentWillMount = () => {
    this.getInstances({});
  }

  getActiveFilters = (filters) => {
    return filters.filter(filter => filter.activeValue !== 0).map(filter => ({
      name: filter.field,
      op: filter.op,
      val: filter.op === "like" ? `%${filter.values[filter.activeValue].value}%` : `${filter.values[filter.activeValue].value}`,
    }));
  }

  getInstances = ({newSort, newFilters}) => {
    let sort = []
    if (newSort === undefined) {
      if (this.props.sorts.length) {
        sort = this.props.sorts[this.state.activeSortIndex].field;
      }
    } else {
      sort = newSort;
    }
    const filters = newFilters ? newFilters : this.getActiveFilters(this.state.filters); 
    getModelData({
      model: this.props.type,
      sort,
      filters,
      callback: (data) => this.setState({data, loading: false}),
    });
  }

  changeSort = (activeSortIndex) => {
    this.setState({activeSortIndex, data: [], loading: true});
    this.getInstances({newSort: this.props.sorts[activeSortIndex].field});
  }

  updateFilters = (filterIndex, valueIndex) => {
    const newFilters = [...this.state.filters];
    newFilters[filterIndex].activeValue = valueIndex;
    this.setState({filters: newFilters, data: [], loading: true});
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
          sorts={this.props.sorts}
          changeSort={this.changeSort}
          activeSortIndex={this.state.activeSortIndex}
          pages={this.props.pages}
          searchText={this.props.searchText}
          updateSearch={this.props.updateSearch}
          handleSubmit={this.props.handleSubmit} />
        <ThumbnailPage
          loading={this.state.loading}
          type={this.props.type}
          data={this.state.data.map(instance => this.props.handleModel(instance))} />
      </div>
    );
  }
}

FiltersContainer.defaultProps = {
  filters: [],
  sorts: [],
}

FiltersContainer.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleModel: PropTypes.func,
  filters: PropTypes.array,
  sorts: PropTypes.array,
  type: PropTypes.string,
}

export default FiltersContainer;

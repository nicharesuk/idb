import React, { Component } from 'react';
import ThumbnailPage from './ThumbnailPage';
import { getModelData } from './Requests';
import NavMenu from './NavMenu';
import PropTypes from 'prop-types';
import { changePageURL } from './Utilities';

class FiltersContainer extends Component {

  state = {
    data: [],
    filters: this.props.filters.map(filter => ({activeValue: 0, ...filter})),
    activeSortIndex: 0,
    loading: true,
    ascending: true,
    maxPage: 1,
  }

  componentWillMount = () => {
    this.getInstances({});
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.page !== this.props.page) {
      if (!this.state.loading) {
        this.setState({data: [], loading: true});
        this.getInstances({newPage: nextProps.page});
      }
    }
  }

  getActiveFilters = (filters) => {
    return filters.filter(filter => filter.activeValue !== 0).map(filter => ({
      name: filter.field,
      op: filter.op,
      val: filter.op === "like" ? `%${filter.values[filter.activeValue].value}%` : `${filter.values[filter.activeValue].value}`,
    }));
  }

  getInstances = ({newSort, newFilters, newDirection, newPage}) => {
    const ascending = newDirection !== undefined ? newDirection : this.state.ascending;

    let sort = ""
    if (newSort === undefined) {
      if (this.props.sorts.length) {
        sort = this.props.sorts[this.state.activeSortIndex].field;
      }
    } else {
      sort = newSort;
    }
    sort = ascending ? sort : `-${sort}`;

    const filters = newFilters ? newFilters : this.getActiveFilters(this.state.filters);

    const page = newPage !== undefined ? newPage : this.props.page;

    getModelData({
      model: this.props.type,
      sort,
      filters,
      page,
      callback: (data, maxPage) => {
        this.setState({data, maxPage, loading: false});
      },
    });
  }

  changePage = (newPage) => {
    const newURL = changePageURL(newPage);
    if (newURL === null) {
      return;
    }
    this.context.router.history.push(newURL);
  }

  changeSort = (activeSortIndex) => {
    this.setState({activeSortIndex, data: [], loading: true});
    this.changePage(1);
    this.getInstances({newSort: this.props.sorts[activeSortIndex].field, newPage: 1});
  }

  changeDirection = (ascending) => {
    if (ascending === this.state.ascending) {
      return;
    }
    this.setState({ascending, data: [], loading: true});
    this.changePage(1);
    this.getInstances({newDirection: ascending, newPage: 1});
  }

  updateFilters = (filterIndex, valueIndex) => {
    const newFilters = [...this.state.filters];
    newFilters[filterIndex].activeValue = valueIndex;
    this.setState({filters: newFilters, data: [], loading: true});
    this.changePage(1);
    this.getInstances({
      newFilters: this.getActiveFilters(newFilters),
      newPage: 1,
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
          ascending={this.state.ascending}
          changeDirection={this.changeDirection}
          activeSortIndex={this.state.activeSortIndex}
          pages={this.props.pages}
          searchText={this.props.searchText}
          handleSubmit={this.props.handleSubmit} />
        <ThumbnailPage
          loading={this.state.loading}
          type={this.props.type}
          data={this.state.data.map(instance => this.props.handleModel(instance))}
          maxPage={this.state.maxPage}
          changePage={this.changePage} />
      </div>
    );
  }
}

FiltersContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};


FiltersContainer.defaultProps = {
  filters: [],
  sorts: [],
  page: 1,
}

FiltersContainer.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleModel: PropTypes.func,
  filters: PropTypes.array,
  sorts: PropTypes.array,
  type: PropTypes.string,
  page: PropTypes.number,
}

export default FiltersContainer;

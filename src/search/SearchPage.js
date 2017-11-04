import React, { Component } from 'react';
import SearchResults from './SearchResults';
import { getSearchData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

class SearchPage extends Component {

  state = {
    data: [],
    loading: true,
    page: 1,
    maxPage: 1,
  }

  componentWillMount = () => {
    this.getInstances(this.props.currentSearch, 1);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentSearch !== this.props.currentSearch) {
      this.setState({data: [], loading: true});
      this.getInstances(nextProps.currentSearch, 1);
    }
  }

  getInstances = (search, page) => {

    // const page = newPage !== undefined ? newPage : this.state.page;

    getSearchData({
      searchText: search,
      models: ["animes", "characters", "mangas", "actors"],
      page: `${page}`,
      callback: (data) => {
        this.setState({data, loading: false});
      },
    });
  }

  changePage = (newPage) => {
    if (newPage === this.state.page) {
      return;
    }
    this.setState({page: newPage, data: [], loading: true});
    this.getInstances({newPage});
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          pages={this.props.pages}
          searchText={this.props.searchText}
          updateSearch={this.props.updateSearch}
          handleSubmit={this.props.handleSubmit} />
        <SearchResults
          loading={this.state.loading}
          data={this.state.data}
          currentPage={this.state.page}
          maxPage={this.state.maxPage}
          changePage={this.changePage} />
      </div>
    );
  }
}

SearchPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  currentSearch: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default SearchPage;

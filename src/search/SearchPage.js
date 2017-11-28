import React, { Component } from 'react';
import SearchResults from './SearchResults';
import { getSearchData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';
import { changePageURL } from '../shared/Utilities';

const models = [
  {
    name: "animes",
    attributes: [
      {
        name: "Title",
        key: "title",
      },
      {
        name: "Media Type",
        key: "media_type",
      },
      {
        name: "Rating",
        key: "rating",
      },
      {
        name: "Aired",
        key: "aired",
      },
      {
        name: "Genre",
        key: "genre",
      },
      {
        name: "Status",
        key: "status",
      },
      {
        name: "Synopsis",
        key: "synopsis",
      },
      {
        name: "Score",
        key: "score",
      },
      {
        name: "Number of Episodes",
        key: "num_episodes",
      },
    ],
  },
  {
    name: "characters",
    attributes: [
      {
        name: "About",
        key: "about",
      },
      {
        name: "Name",
        key: "name",
      },
      {
        name: "Role",
        key: "role",
      },
    ],
  },
  {
    name: "mangas",
    attributes: [
      {
        name: "Title",
        key: "title",
      },
      {
        name: "Published",
        key: "published",
      },
      {
        name: "Media Type",
        key: "media_type",
      },
      {
        name: "Author",
        key: "author",
      },
      {
        name: "Genre",
        key: "genre",
      },
      {
        name: "Status",
        key: "status",
      },
      {
        name: "Synopsis",
        key: "synopsis",
      },
      {
        name: "Score",
        key: "score",
      },
      {
        name: "Number of Chapters",
        key: "num_chapters",
      },
    ],
  },
  {
    name: "actors",
    attributes: [
      {
        name: "Birthday",
        key: "birthday",
      },
      {
        name: "Language",
        key: "language",
      },
      {
        name: "Name",
        key: "name",
      },
    ],
  },
];

const keyNames = {};
models.forEach(model => {
  model.attributes.forEach(attr => {
    keyNames[attr.key] = attr.name;
  })
})

const searchFilters = [
  {
    name: "All",
    value: "all",
    color: "",
  },
  {
    name: "Anime",
    value: "animes",
    color: "red",
  },
  {
    name: "Characters",
    value: "characters",
    color: "purple",
  },
  {
    name: "Mangas",
    value: "mangas",
    color: "yellow",
  },
  {
    name: "Actors",
    value: "actors",
    color: "blue",
  },
];

class SearchPage extends Component {

  state = {
    data: [],
    loading: true,
    maxPage: 1,
    orSearch: true,
    filters: searchFilters.map(filter => ({...filter, active: filter.value === "all"})),
  }

  componentWillMount = () => {
    this.getInstances({});
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.searchText !== this.props.searchText) {
      this.setState({data: [], loading: true, page: 1});
      this.getInstances({newSearch: nextProps.searchText, newPage: 1});
    } else if (nextProps.page !== this.props.page) {
      if (!this.state.loading) {
        this.setState({data: [], loading: true});
        this.getInstances({newPage: nextProps.page});
      }
    }
  }

  getInstances = ({newSearch, newFilters, newPage, newOrSearch}) => {
    const search = newSearch !== undefined ? newSearch : this.props.searchText;
    const filters = newFilters !== undefined ? newFilters : this.state.filters;

    const page = newPage !== undefined ? newPage : this.props.page;

    const orSearch = newOrSearch !== undefined ? newOrSearch : this.state.orSearch;

    let activeFilters = [];
    if (filters[0].active) {
      activeFilters = searchFilters.slice(1).map(f => f.value);
    } else {
      activeFilters = filters.slice(1).filter(f => f.active).map(f => f.value);
    }

    const slimModels = models.map(m => ({
      name: m.name,
      attributes: m.attributes.map(attr => attr.key),
    }));

    getSearchData({
      models: slimModels,
      searchText: search,
      activeModels: activeFilters,
      page: `${page}`,
      orSearch,
      callback: (data, maxPage) => {
        this.setState({
          data,
          maxPage: maxPage ? maxPage : 1,
          loading: false});
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

  updateFilters = (filterIndex) => {
    let filters = [
      ...this.state.filters,
    ];

    if (filterIndex === 0 && !filters[0].active) {
      filters = filters.map(f => ({...f, active: f.value === "all"}));
    } else if (filterIndex !== 0) {
      filters[0].active = false;
      filters[filterIndex] = {
        ...filters[filterIndex],
        active: !filters[filterIndex].active,
      };
    }

    this.setState({filters, data: [], loading: true});
    this.changePage(1);
    this.getInstances({newFilters: filters, newPage: 1});
  }

  updateOperation = (orSearch) => {
    if (orSearch === this.state.orSearch) {
      return;
    }
    this.setState({orSearch, data: [], loading: true});
    this.changePage(1);
    this.getInstances({newOrSearch: orSearch, newPage: 1});
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          pages={this.props.pages}
          searchText={this.props.searchText}
          handleSubmit={this.props.handleSubmit} />
        <SearchResults
          keyNames={keyNames}
          loading={this.state.loading}
          data={this.state.data}
          currentPage={this.state.page}
          maxPage={this.state.maxPage}
          changePage={this.changePage}
          searchText={this.props.searchText}
          filters={this.state.filters}
          updateFilters={this.updateFilters}
          orSearch={this.state.orSearch}
          updateOperation={this.updateOperation} />
      </div>
    );
  }
}


SearchPage.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

SearchPage.defaultProps = {
  page: 1,
}

SearchPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
  page: PropTypes.number,
}

export default SearchPage;

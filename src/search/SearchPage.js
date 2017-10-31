import React, { Component } from 'react';
// import styles from './SearchPage.scss';
import PropTypes from 'prop-types';
import FiltersContainer from '../shared/FiltersContainer';

class SearchPage extends Component {

  render() {
    // https://github.com/bvaughn/react-highlight-words
    return (
      <FiltersContainer
        {...this.props} />
    );
  }
}

SearchPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default SearchPage;

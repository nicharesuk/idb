import React, { Component } from 'react';
// import styles from './SearchPage.scss';
import { getModelData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

class SearchPage extends Component {

  render() {
    // https://github.com/bvaughn/react-highlight-words
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          pages={this.props.pages}
          searchText={this.props.searchText}
          updateSearch={this.props.updateSearch}
          handleSubmit={this.props.handleSubmit} />
      </div>
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

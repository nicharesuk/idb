import React, { Component } from 'react';
// import styles from './CharactersPage.scss';
import PropTypes from 'prop-types';
import FiltersContainer from '../shared/FiltersContainer';

// TODO: Fill in all filters and sorts for this page

const filters = []

const sorts = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Japanese Name",
    field: "japanese_name",
  },
];

class CharactersPage extends Component {

  handleModel = (character) => {
    return {
      ...character,
      title: character.name,
      subInfo_1: character.japanese_name,
    }
  }

  render() {
    return (
      <FiltersContainer
        {...this.props}
        filters={filters}
        sorts={sorts}
        type="characters"
        handleModel={this.handleModel} />
    );
  }
}

CharactersPage.propTypes = {
  pages: PropTypes.array,
  searchText: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default CharactersPage;

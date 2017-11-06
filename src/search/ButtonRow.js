import React, { Component } from 'react';
import styles from './ButtonRow.scss';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class SearchResults extends Component {
 
  handleButtonClick = (value) => {
    if (this.props.activeFilters.includes(value)) {
      return;
    }
    const newFilters = [
      ...this.props.activeFilters,
      value,
    ];
    this.props.updateFilters(newFilters);
  }

  render() {
    return (
      <div className={styles.buttonRow}>
        <div className={styles.button}>
          <Button
            size="large"
            inverted
            active={this.props.activeFilters.length === 0}
            onClick={() => this.props.updateFilters([])}>
            All
          </Button>
        </div>
        {this.props.searchFilters.map(filter => (
          <div key={filter.name} className={styles.button}>
            <Button
              className={styles.button}
              size="large"
              inverted
              color={filter.color}
              active={this.props.activeFilters.includes(filter.value)}
              onClick={() => this.handleButtonClick(filter.value)}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchFilters: PropTypes.array,
  activeFilters: PropTypes.array,
  updateFilters: PropTypes.func,
}

export default SearchResults;

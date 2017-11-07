import React, { Component } from 'react';
import styles from './ButtonRow.scss';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class SearchResults extends Component {

  render() {
    return (
      <div className={styles.buttonRow}>
        {this.props.filters.map((filter, index) => (
          <div key={filter.name} className={styles.button}>
            <Button
              className={styles.button}
              size="large"
              as="a"
              inverted
              color={filter.color ? filter.color : undefined}
              active={filter.active}
              onClick={() => this.props.updateFilters(index)}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

SearchResults.propTypes = {
  filters: PropTypes.array,
  updateFilters: PropTypes.func,
}

export default SearchResults;

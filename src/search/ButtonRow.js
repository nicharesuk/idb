import React, { Component } from 'react';
import styles from './ButtonRow.scss';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class SearchResults extends Component {

  render() {
    return (
      <div className={styles.buttonRow}>
        <div className={styles.row}>
          {this.props.filters.map((filter, index) => (
            <div key={filter.name} className={styles.button}>
              <Button
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
        <div className={styles.row}>
          <div className={styles.button}>
            <Button
              inverted
              active={this.props.orSearch}
              onClick={() => this.props.updateOperation(true)}
              size="large">
              Or
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              inverted
              active={!this.props.orSearch}
              onClick={() => this.props.updateOperation(false)}
              size="large">
              And
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  filters: PropTypes.array,
  updateFilters: PropTypes.func,
  orSearch: PropTypes.bool,
  updateOperation: PropTypes.func,
}

export default SearchResults;

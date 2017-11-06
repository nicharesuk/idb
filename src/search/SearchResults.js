import React, { Component } from 'react';
import styles from './SearchResults.scss';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ModalInstance from '../modal/ModalInstance';
import PageList from '../shared/PageList';
import ReactDOM from 'react-dom';
import Result from './Result';
import ButtonRow from './ButtonRow';

class SearchResults extends Component {
 
  state = {
    modalOpen: false,
    selectedIndex: 0,

  }

  openModalAction = (index) => {
    this.setState({
      modalOpen: true,
      selectedIndex: index,
    });
  }

  closeModalAction = () => {
    this.setState({
      modalOpen: false,
    });
  }

  componentDidUpdate = () => {
    ReactDOM.findDOMNode(this).scrollTop = 0
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.loading ?
          <div className={styles.emptyContainer}>
            <Loader
              size="massive"
              active
              inverted>
              Loading
            </Loader>
          </div> : null
        }
        {!this.props.data.length && !this.props.loading ?
          <div className={styles.emptyContainer}>
            <h1 className={styles.noResults}>No Results</h1>
          </div> : null
        }
        {this.props.data.length ?
          <ModalInstance
            id={this.props.data[this.state.selectedIndex].id}
            type={this.props.data[this.state.selectedIndex].type}
            onClose={this.closeModalAction}
            open={this.state.modalOpen} /> : null
        }
        <div className={styles.items}>
          <ButtonRow
            searchFilters={this.props.searchFilters}
            activeFilters={this.props.activeFilters}
            updateFilters={this.props.updateFilters} />
          {this.props.data.map((instance, index) => (
            <div
              className={styles.result}
              style={{backgroundColor: index % 2 === 0 ? "#1f2025" : "transparent"}}
              onClick={() => this.openModalAction(index)}
              key={`result-component-${index}`}>
                <Result
                  data={instance}
                  searchText={this.props.searchText} />
            </div>
          ))}
          <div className={styles.pageList}>
            <PageList
              currentPage={this.props.currentPage}
              maxPage={this.props.maxPage}
              changePage={this.props.changePage} />
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
  searchText: PropTypes.string,
  searchFilters: PropTypes.array,
  activeFilters: PropTypes.array,
  updateFilters: PropTypes.func,
}

export default SearchResults;

import React, { Component } from 'react';
import styles from './SearchResults.scss';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ModalInstance from '../modal/ModalInstance';
import PageList from '../shared/PageList';
import ReactDOM from 'react-dom';
import Result from './Result';

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
    if (this.props.loading) {
      return (
        <div className={styles.emptyContainer}>
          <Loader
            size="massive"
            active
            inverted>
            Loading
          </Loader>
        </div>
      );
    }
    if (!this.props.data.length) {
      return (
        <div className={styles.emptyContainer}>
          <h1 className={styles.noResults}>No Results</h1>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <ModalInstance
          id={this.props.data[this.state.selectedIndex].id}
          type={this.props.data[this.state.selectedIndex].type}
          onClose={this.closeModalAction}
          open={this.state.modalOpen} />
        <div className={styles.items}>
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
}

export default SearchResults;

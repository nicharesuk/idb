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
    const shouldButtonRowShow = this.props.searchText.length;
    const data = this.props.data;
    const index = this.state.selectedIndex;
    const modalId = data[index] ? data[index].id : null;
    const modalType = data[index] ? data[index].type : null;
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
            <h1 className={styles.noResults}>
              {!this.props.searchText.length ? "Make a search" : "No Results"}
            </h1>
          </div> : null
        }
        {this.props.data.length ?
          <ModalInstance
            id={modalId}
            type={modalType}
            onClose={this.closeModalAction}
            open={this.state.modalOpen} /> : null
        }
        <div className={styles.items}>
          {shouldButtonRowShow ?
            <ButtonRow
              filters={this.props.filters}
              updateFilters={this.props.updateFilters} /> : null
          }
          {this.props.data.map((instance, index) => (
            <div
              className={styles.result}
              style={{backgroundColor: index % 2 === 0 ? "#1f2025" : "transparent"}}
              onClick={() => this.openModalAction(index)}
              key={`result-component-${index}`}>
                <Result
                  keyNames={this.props.keyNames}
                  data={instance}
                  searchText={this.props.searchText} />
            </div>
          ))}
          <div className={styles.pageList}>
            {this.props.data.length ?
              <PageList
                currentPage={this.props.currentPage}
                maxPage={this.props.maxPage}
                changePage={this.props.changePage} /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  keyNames: PropTypes.object,
  loading: PropTypes.bool,
  data: PropTypes.array,
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
  searchText: PropTypes.string,
  filters: PropTypes.array,
  updateFilters: PropTypes.func,
}

export default SearchResults;

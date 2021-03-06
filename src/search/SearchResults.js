import React, { Component } from 'react';
import styles from './SearchResults.scss';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ModalInstance from '../modal/ModalInstance';
import PageList from '../shared/PageList';
import ReactDOM from 'react-dom';
import Result from './Result';
import ButtonRow from './ButtonRow';
import { changeModalURL } from '../shared/Utilities';

class SearchResults extends Component {

  openModalAction = (id, type) => {
    this.context.router.history.push(changeModalURL(id, type));
  }

  componentDidUpdate = () => {
    ReactDOM.findDOMNode(this).scrollTop = 0
  }

  render() {
    const shouldButtonRowShow = this.props.searchText.length;
    this.props.data.sort((a, b) => {
      if(a.id < b.id) return -1;
      if(a.id > b.id) return 1;
      const aName = a.title ? a.title : a.name;
      const bName = b.title ? b.title : b.name;
      if(aName < bName) return -1;
      if(aName > bName) return 1;
      return 0;
    });
    const searchWords = this.props.searchText.split(' ').filter(w => w.length !== 0).map(w => w.toLowerCase());
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
        <ModalInstance pageType="search" />
        }
        <div className={styles.items}>
          {shouldButtonRowShow ?
            <ButtonRow
              filters={this.props.filters}
              updateFilters={this.props.updateFilters}
              orSearch={this.props.orSearch}
              updateOperation={this.props.updateOperation} /> : null
          }
          {this.props.data.map((instance, index) => (
            <div
              className={styles.result}
              style={{backgroundColor: index % 2 === 0 ? "#1f2025" : "transparent"}}
              onClick={() => this.openModalAction(instance.id, instance.type)}
              key={`result-component-${index}`}>
                <Result
                  keyNames={this.props.keyNames}
                  data={instance}
                  searchWords={searchWords} />
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

SearchResults.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

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
  orSearch: PropTypes.bool,
  updateOperation: PropTypes.func,
}

export default SearchResults;

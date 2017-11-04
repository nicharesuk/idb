import React, { Component } from 'react';
import styles from './SearchResults.scss';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ModalInstance from '../modal/ModalInstance';
import PageList from '../shared/PageList';
import ReactDOM from 'react-dom';

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
          type={this.props.type}
          onClose={this.closeModalAction}
          open={this.state.modalOpen} />
        <div className={styles.items}>
        {/*
          {this.props.data.map((instance, index) => (
            <div
              onClick={() => this.openModalAction(index)}
              key={`thumbnail-component-${index}`}>
              <ThumbnailCard
                title={instance.title}
                picture={instance.picture}
                score={instance.score}
                subInfo_1={instance.subInfo_1}
                subInfo_2={instance.subInfo_2} />
            </div>
          ))}
          {ghosts}
        */}
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
}

export default SearchResults;

import React, { Component } from 'react';
import styles from './ThumbnailPage.scss';
import ThumbnailCard from './ThumbnailCard';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ModalInstance from '../modal/ModalInstance';
import PageList from './PageList';
import ReactDOM from 'react-dom';
import { changeModalURL } from './Utilities';

const THUMBNAIL_WIDTH = 134 + 20;

class ThumbnailPage extends Component {
 
  state = {
    windowWidth: '0',
    windowHeight: '0',
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight});
  }

  openModalAction = (index) => {
    const id = this.props.data[index].id;
    this.context.router.history.push(changeModalURL(id, this.props.type));
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
    const numGhosts = Math.floor(this.state.windowWidth / THUMBNAIL_WIDTH);
    const ghosts = [];
    for (let i = 0; i < numGhosts; i++) {
      ghosts.push(<div key={`ghost-KiD${i}`} className={styles.ghost}></div>);
    }

    const data = this.props.data;
    return (
      <div className={styles.container}>
        <ModalInstance pageType={this.props.type} />
        <div className={styles.items}>
          {data.map((instance, index) => (
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
          <div className={styles.pageList}>
            <PageList
              maxPage={this.props.maxPage}
              changePage={this.props.changePage} />
          </div>
        </div>
      </div>
    );
  }
}


ThumbnailPage.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

ThumbnailPage.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  data: PropTypes.array,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
}

export default ThumbnailPage;

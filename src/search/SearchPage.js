import React, { Component } from 'react';
// import styles from './SearchPage.scss';
import { getModelData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

class SearchPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('actors', (data) => this.setState({data}));
  }

  render() {
    // https://github.com/bvaughn/react-highlight-words
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          pages={this.props.pages} />
      </div>
    );
  }
}

SearchPage.propTypes = {
  pages: PropTypes.array,
}

export default SearchPage;

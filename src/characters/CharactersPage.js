import React, { Component } from 'react';
// import styles from './CharactersPage.scss';
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

const sorts = [
  {
    name: "Name",
    field: "name",
  },
];

class CharactersPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('characters', (data) => this.setState({data}));
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          sorts={sorts}
          pages={this.props.pages} />
        <ThumbnailPage
          type="characters"
          data={this.state.data.map(character => {
            return {
              ...character,
              title: character.name,
              subInfo_1: character.japanese_name,
            }
          })} />
      </div>
    );
  }
}

CharactersPage.propTypes = {
  pages: PropTypes.array,
}

export default CharactersPage;

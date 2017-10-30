import React, { Component } from 'react';
// import styles from './MangaPage.scss
import ThumbnailPage from '../shared/ThumbnailPage';
import { getModelData } from '../shared/Requests';
import getStartYear from '../shared/GetStartYear';
import NavMenu from '../shared/NavMenu';
import PropTypes from 'prop-types';

const filters = [
  {
    name: "Genre",
    field: "genre",
    op: "has",
    values: [
      {
        name: "Action",
        value: "Action",
      },
    ],
  },
];

const sorts = [
  {
    name: "Score",
    field: "score",
  },
  {
    name: "Title",
    field: "title",
  },
];

class MangaPage extends Component {

  state = {
    data: []
  }

  componentWillMount = () => {
    getModelData('mangas', (data) => this.setState({data}));
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <NavMenu
          filters={filters}
          sorts={sorts}
          pages={this.props.pages} />
        <ThumbnailPage
          type="mangas"
          data={this.state.data.map(manga => {
            const subInfo_2 = manga.num_chapters === "Unknown" ? "" : `${manga.num_chapters} chapters`
            return {
              ...manga,
              subInfo_1: `${getStartYear(manga.published)}`,
              subInfo_2: subInfo_2,
            }
          })} />
      </div>
    );
  }
}

MangaPage.propTypes = {
  pages: PropTypes.array,
}


export default MangaPage;

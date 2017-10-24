import React, { Component } from 'react';
// import './ShowDetails.css';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class ShowModalContent extends Component {

  onClickCharacter = (index) => {
    console.log(index);
  }

  onClickManga = (index) => {
    console.log(index);
  }

  render() {
    const { title, aired, score, num_episodes, synopsis, status, rating, genre, characters, mangas} = this.props.dataObject;

    console.log(this.props.dataObject);
    return (
      <ModalDetails
        title={title}
        detailsList={[aired, `${num_episodes}`, status, rating, score, genre ]}
        paragraph={synopsis}
        primaryList={characters.data.map(character => character.id)}
        primaryListTitle={"Characters"}
        primaryListAction={this.onClickCharacter}
        secondaryList={mangas.data.map(manga => manga.id)}
        secondaryListTitle={"Mangas"}
        secondaryListAction={this.onClickManga}/>
    );
  }
}

ShowModalContent.propTypes = {
  dataObject: PropTypes.object,
}

export default ShowModalContent;

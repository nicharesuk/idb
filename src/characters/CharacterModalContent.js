import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class CharacterDetails extends Component {

  render() {
    const { name, about, japanese_name, included} = this.props.dataObject;

    let actorList = [];
    let animeList = [];
    let mangaList = [];
    if (included) {
      actorList = included.filter(obj => obj.type === "actors").map(obj => obj.attributes.name);
      animeList = included.filter(obj => obj.type === "animes").map(obj => obj.attributes.title);
      mangaList = included.filter(obj => obj.type === "mangas").map(obj => obj.attributes.title);
    }

    let lists = [
      {
        data: actorList,
        title: "Actors",
        action: (index) => this.props.onChange("actors", index),
      },
      {
        data: animeList,
        title: "Animes",
        action: (index) => this.props.onChange("animes", index),
      },
      {
        data: mangaList,
        title: "Mangas",
        action: (index) => this.props.onChange("mangas", index),
      },
    ];
    return (
      <ModalDetails
        title={name}
        detailsList={[japanese_name]}
        paragraph={about}
        lists={lists} />
    );
  }
}

CharacterDetails.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default CharacterDetails;

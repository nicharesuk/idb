import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class MangaDetails extends Component {

  render() {
    const { title, published, score, num_chapters, synopsis, status, genre, included} = this.props.dataObject;

    let characterList = [];
    let animeList = [];
    if (included) {
      characterList = included.filter(obj => obj.type === "characters").map(obj => obj.attributes.name);
      animeList = included.filter(obj => obj.type === "animes").map(obj => obj.attributes.title);
    }

    let lists = [
      {
        data: characterList,
        title: "Characters",
        action: (index) => this.props.onChange("characters", index),
      },
      {
        data: animeList,
        title: "Animes",
        action: (index) => this.props.onChange("animes", index),
      },
    ];
    return (
      <ModalDetails
        title={title}
        detailsList={[published, `Chapters: ${num_chapters}`, status, score, genre ]}
        paragraph={synopsis}
        lists={lists}/>
    );
  }
}

MangaDetails.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default MangaDetails;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class MangaDetails extends Component {

  onClickCharacter = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "characters")[index].id
    this.props.onChange("characters", id);
  }

  onClickAnime = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "animes")[index].id
    this.props.onChange("animes", id);
  }

  render() {
    const { title, published, score, num_chapters, synopsis, status, rating, genre, included} = this.props.dataObject;

    let characterList = [];
    let animeList = [];
    if (included) {
      characterList = included.filter(obj => obj.type === "characters").map(obj => obj.attributes.name);
      animeList = included.filter(obj => obj.type === "animes").map(obj => obj.attributes.title);
    }
    return (
      <ModalDetails
        title={title}
        detailsList={[published, `${num_chapters}`, status, rating, score, genre ]}
        paragraph={synopsis}
        primaryList={characterList}
        primaryListTitle={"Characters"}
        primaryListAction={this.onClickCharacter}
        secondaryList={animeList}
        secondaryListTitle={"Anime"}
        secondaryListAction={this.onClickAnime}/>
    );
  }
}

MangaDetails.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default MangaDetails;

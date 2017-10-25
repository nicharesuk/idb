import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class CharacterDetails extends Component {

  onClickActor = (index) => {
    console.log(index);
  }

  onClickAnime = (index) => {
    console.log(index);
  }

  render() {
    const { name, about, japanese_name, included} = this.props.dataObject;

    let actorList = [];
    let animeList = [];
    if (included) {
      actorList = included.filter(obj => obj.type === "actors").map(obj => obj.attributes.name);
      animeList = included.filter(obj => obj.type === "animes").map(obj => obj.attributes.title);
    }
    return (
      <ModalDetails
        title={name}
        detailsList={[japanese_name]}
        paragraph={about}
        primaryList={actorList}
        primaryListTitle={"Actors"}
        primaryListAction={this.onClickActor}
        secondaryList={animeList}
        secondaryListTitle={"Anime"}
        secondaryListAction={this.onClickAnime}/>
    );
  }
}

CharacterDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default CharacterDetails;

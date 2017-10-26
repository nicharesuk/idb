import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class CharacterDetails extends Component {

  onClickActor = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "actors")[index].id
    this.props.onChange("actors", id);
  }

  onClickAnime = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "animes")[index].id
    this.props.onChange("animes", id);
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
  onChange: PropTypes.func,
}

export default CharacterDetails;

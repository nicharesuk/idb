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

  onClickManga = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "mangas")[index].id
    this.props.onChange("mangas", id);
  }

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
    let primaryList = actorList.length ? actorList : mangaList;
    let primaryTitle = actorList.length ? "Actors" : "Mangas";
    let primaryAction = actorList.length ? this.onClickActor : this.onClickManga;
    return (
      <ModalDetails
        title={name}
        detailsList={[japanese_name]}
        paragraph={about}
        primaryList={primaryList}
        primaryListTitle={primaryTitle}
        primaryListAction={primaryAction}
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

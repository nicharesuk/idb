import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class PersonDetails extends Component {

  onClickCharacter = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "characters")[index].id
    this.props.onChange("characters", id);
  }

  onClickAnime = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "animes")[index].id
    this.props.onChange("animes", id);
  }

  render() {
    const { name, language, birthday, website, included} = this.props.dataObject;

    let characterList = [];
    let animeList = [];
    if (included) {
      characterList = included.filter(obj => obj.type === "characters").map(obj => obj.attributes.name);
      animeList = included.filter(obj => obj.type === "animes").map(obj => obj.attributes.title);
    }
    return (
      <ModalDetails
        title={name}
        website={website}
        websiteText={"Link to website"}
        detailsList={[language, `Born on ${birthday}`]}
        primaryList={characterList}
        primaryListTitle={"Characters"}
        primaryListAction={this.onClickCharacter}
        secondaryList={animeList}
        secondaryListTitle={"Anime"}
        secondaryListAction={this.onClickAnime}/>
    );
  }
}

PersonDetails.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default PersonDetails;

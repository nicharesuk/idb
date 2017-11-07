import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../modal/ModalDetails';

class PersonDetails extends Component {

  render() {
    const { name, language, birthday, website, included} = this.props.dataObject;

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
        title={name}
        website={website}
        websiteText={"Link to website"}
        detailsList={[language, `Born on ${birthday}`]}
        lists={lists} />
    );
  }
}

PersonDetails.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default PersonDetails;

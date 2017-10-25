import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class ShowModalContent extends Component {

  onClickCharacter = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "characters")[index].id
    this.props.onChange("characters", id);
  }

  onClickManga = (index) => {
    const id = this.props.dataObject.included.filter(obj => obj.type === "mangas")[index].id
    this.props.onChange("mangas", id);
  }

  render() {
    const { title, aired, score, num_episodes, synopsis, status, rating, genre, included} = this.props.dataObject;

    let characterList = [];
    let mangaList = [];
    if (included) {
      characterList = included.filter(obj => obj.type === "characters").map(obj => obj.attributes.name);
      mangaList = included.filter(obj => obj.type === "mangas").map(obj => obj.attributes.title);
    }
    return (
      <ModalDetails
        title={title}
        detailsList={[aired, `${num_episodes}`, status, rating, score, genre ]}
        paragraph={synopsis}
        primaryList={characterList}
        primaryListTitle={"Characters"}
        primaryListAction={this.onClickCharacter}
        secondaryList={mangaList}
        secondaryListTitle={"Mangas"}
        secondaryListAction={this.onClickManga}/>
    );
  }
}

ShowModalContent.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default ShowModalContent;

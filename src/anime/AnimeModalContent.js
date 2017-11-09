import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDetails from '../modal/ModalDetails';

class ShowModalContent extends Component {

  render() {
    const { title, aired, score, num_episodes, youtube_id, synopsis, status, rating, genre, included} = this.props.dataObject;

    let characterList = [];
    let mangaList = [];
    if (included) {
      characterList = included.filter(obj => obj.type === "characters").map(obj => obj.attributes.name);
      mangaList = included.filter(obj => obj.type === "mangas").map(obj => obj.attributes.title);
    }

    let lists = [
      {
        data: characterList,
        title: "Characters",
        action: (index) => this.props.onChange("characters", index),
      },
      {
        data: mangaList,
        title: "Mangas",
        action: (index) => this.props.onChange("mangas", index),
      },
    ];
    return (
      <ModalDetails
        title={title}
        detailsList={[aired, `${num_episodes}`, status, rating, score, genre ]}
        website={youtube_id ? youtube_id : null}
        websiteText={"Link to trailer"}
        paragraph={synopsis}
        lists={lists} />
    );
  }
}

ShowModalContent.propTypes = {
  dataObject: PropTypes.object,
  onChange: PropTypes.func,
}

export default ShowModalContent;

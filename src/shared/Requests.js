import axios from 'axios';

export function getModelData (model, callback, number) {
  axios({
    method: 'get',
    url: `api/${model}`,
    headers: {'Accept': 'application/vnd.api+json'}
  }).then((response) => {
    const data = response.data.data.map(obj => {
      return {
        id: obj.id,
        type: obj.type,
        ...obj.relationships,
        ...obj.attributes,
      }
    });
    callback(data);
  });
}

export function getSingleModel (model, callback, number) {
  let url;
  if        (model === "animes") {
    url = `api/${model}/${number}?include=characters,mangas`;
  } else if (model === "characters") {
    url = `api/${model}/${number}?include=actors,animes`;
  } else if (model === "actors") {
    url = `api/${model}/${number}?include=characters,animes`;
  } else if (model === "mangas") {
    url = `api/${model}/${number}?include=animes,characters`;
  } else {
    url = "front-end-error";
  }
  axios({
    method: 'get',
    url,
    headers: {'Accept': 'application/vnd.api+json'}
  }).then((response) => {
    callback({
      included: response.data.included,
      id: response.data.data.id,
      type: response.data.data.type,
      ...response.data.data.relationships,
      ...response.data.data.attributes,
    });
  });
}

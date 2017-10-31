import axios from 'axios';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// ^ We will use these functions to craft the filter url parameter

export function getModelData ({model, callback, sort, filters}) {
  // TODO: Use filters and sorts to modify the axios call
  axios({
    method: 'get',
    url: `api/${model}`,
    headers: {'Accept': 'application/vnd.api+json'},
    params: {
      "filter[objects]": JSON.stringify(filters),
      "sort": sort,
    },
  }).then((response) => {
    if (!response.data.data) {
      callback([]);
      return;
    }
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
    url = `api/${model}/${number}?include=actors,animes,mangas`;
  } else if (model === "actors") {
    url = `api/${model}/${number}?include=animes,characters`;
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

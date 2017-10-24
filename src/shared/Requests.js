import axios from 'axios';

export function getModelData (model, callback, number) {
  const url = number !== undefined ? `api/${model}/${number}` : `api/${model}`;
  axios({
    method: 'get',
    url,
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

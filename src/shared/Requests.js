import axios from 'axios';

export function getModelData (model, callback) {
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

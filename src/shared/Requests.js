import axios from 'axios';

const PAGE_SIZE = 60;
const SEARCH_PAGE_SIZE = 20;

function getMaxPage(response, pageSize) {
  const total = response.data.meta.total;
  return Math.ceil(total / pageSize);
}

function configureData(response) {
  return response.data.data.map(obj => {
    return {
      id: obj.id,
      type: obj.type,
      ...obj.relationships,
      ...obj.attributes,
    }
  });
}

function getData({model, sort, filters, page, pageSize}) {
  return axios({
    method: 'get',
    url: `api/${model}`,
    headers: {'Accept': 'application/vnd.api+json'},
    params: {
      "filter[objects]": JSON.stringify(filters),
      "sort": sort,
      "page[number]": page,
      "page[size]": pageSize,
    },
  });
}

export function getModelData ({model, callback, sort, filters, page}) {
  getData({model, sort, filters, page, pageSize: PAGE_SIZE})
  .then((response) => {
    if (!response.data.data) {
      callback([], 1);
      return;
    }
    const maxPage = getMaxPage(response, PAGE_SIZE);
    const data = configureData(response);
    callback(data, maxPage);
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

function getFilters(searchText, attributes) {
  const filters = [
    {
      or: attributes.map(attr => ({
        name: attr,
        op: "like",
        val: `%${searchText}%`
      })),
    }
  ];
  return filters;
}

export function getSearchData ({models, searchText, activeModels, callback, page}) {
  if (!searchText) {
    callback([]);
    return;
  }
  const calls = models.filter(m => activeModels.includes(m.name)).map(model => {
    const attributes = model.attributes;
    const filters = getFilters(searchText, attributes);
    return getData({model: model.name, sort: "", filters, page: page, pageSize: SEARCH_PAGE_SIZE});
  })
  axios.all(calls).then((responses) => {
    const datas = responses.map(response => configureData(response));
    const maxPages = responses.map(response => getMaxPage(response, SEARCH_PAGE_SIZE));

    const maxMaxPage = Math.max(...maxPages);

    const allData = [].concat.apply([], datas);

    callback(allData, maxMaxPage);
  });
}

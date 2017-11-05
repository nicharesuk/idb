import axios from 'axios';

const PAGE_SIZE = 60;

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
      "page[size]": PAGE_SIZE,
    },
  });
}

export function getModelData ({model, callback, sort, filters, page}) {
  // TODO: Use filters and sorts to modify the axios call
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

const models = [
  {
    name: "animes",
    attributes: [
      "aired",
      "genre",
      "status",
      "synopsis",
    ],
  },
  {
    name: "characters",
    attributes: [
      "about",
      "name",
    ],
  },
  {
    name: "mangas",
    attributes: [
      "author",
      "genre",
      "status",
      "synopsis",
    ],
  },
  {
    name: "actors",
    attributes: [
      "birthday",
      "language",
      "name",
    ],
  },
];

function getFilters(searchText, model) {
  const attributes = models.find(modelObj => modelObj.name === model).attributes;
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

export function getSearchData ({searchText, models, callback, page}) {
  if (!searchText) {
    callback([]);
    return;
  }
  const calls = models.map(model => {
    const filters = getFilters(searchText, model);
    return getData({model, sort: "", filters, page: 1, pageSize: PAGE_SIZE});
  })
  axios.all(calls).then((responses) => {
    const datas = responses.map(response => configureData(response));

    // const total = 0;
    // datas.forEach((data) => total += data.length);

    const allData = [].concat.apply([], datas);

    callback(allData);
  });
}

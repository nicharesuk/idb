import queryString from 'query-string';

export function getStartYear (dateString) {
  const regex = /(?:(?:19|20)[0-9]{2})/;
  const aired = dateString ? dateString.match(regex) : [];
  const year = aired ? aired[0] : "";
  return year;
}

export function changeModalURL (id, type) {
    const params = queryString.parse(window.location.search);
    const page = params.page ? `page=${params.page}&` : '';
    return `/${window.location.pathname.substring(1)}?${page}type=${type}&id=${id}`;
}

export function closeModalURL () {
    const params = queryString.parse(window.location.search);
    const page = params.page ? `page=${params.page}` : '';
    return `/${window.location.pathname.substring(1)}?${page}`; 
}

export function getCurrentPage () {
  const page = queryString.parse(window.location.search).page;
  return page ? parseInt(page, 10) : 1;
}

export function changePageURL (page) {
	const params = queryString.parse(window.location.search);
	if (params.page === page) {
		return null;
	}
	return `/${window.location.pathname.substring(1)}?page=${page}`;
}
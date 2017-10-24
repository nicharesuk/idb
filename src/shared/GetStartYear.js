
export default function getStartYear (dateString) {
  const regex = /(?:(?:19|20)[0-9]{2})/;
  const aired = dateString ? dateString.match(regex) : [];
  const year = aired ? aired[0] : "";
  return year;
}
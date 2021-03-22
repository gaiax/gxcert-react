import { getGoogleUid } from "./Google";

function copyPubkey(text) {
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  const bodyElm = document.getElementsByTagName("body")[0];
  bodyElm.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  bodyElm.removeChild(copyFrom);
}

function getUrlQueries() {
  let queryStr = window.location.search.slice(1);
  let queries = {};
  if (!queryStr) {
    return queries;
  }
  queryStr.split("&").forEach(function (queryStr) {
    var queryArr = queryStr.split("=");
    queries[queryArr[0]] = queryArr[1];
  });
  return queries;
}
function dateString(date) {
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}


export {
  copyPubkey,
  getUrlQueries,
  getGoogleUid,
  dateString,
}


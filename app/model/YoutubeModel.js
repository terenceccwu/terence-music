const Promise = require('bluebird');
const youtubeSearch = Promise.promisify(require('youtube-search'));

const opts = {
  maxResults: 10,
  key: "AIzaSyC9XsFv_v2X6WVKyN6j4cXqO1W6JiRnGJA",
  fields: 'pageInfo,items(id,snippet(channelTitle,publishedAt,thumbnails/default,title))'
};

export function search(query) {
  // return a Promise
  return youtubeSearch(query,opts)
}

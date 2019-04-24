const url = 'http://n-c-news.herokuapp.com/api';

export const fetchTopic = slug => {
  return fetch(`${url}/topics/${slug}`).then(res => res.json());
};

export const fetchComments = id => {
  return fetch(`${url}/articles/${id}/comments`).then(res => res.json());
};

export const getUser = username => {
  return fetch(`${url}/users/${username}`).then(res => res.json());
};

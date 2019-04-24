import axios from 'axios';

const url = 'http://n-c-news.herokuapp.com/api';

export const fetchTopic = slug => {
  return fetch(`${url}/topics/${slug}`).then(res => res.json());
};

export const fetchComments = id => {
  return fetch(`${url}/articles/${id}/comments`).then(res => res.json());
};

export const getUsers = () => {
  return fetch(`${url}/users`).then(res => res.json());
};

export const getUser = username => {
  return fetch(`${url}/users/${username}`).then(res => res.json());
};

export const vote = (item, amount) => {
  return axios
    .patch(
      `${url}/${item.article_id ? 'articles' : 'comments'}/${
        item.article_id ? item.article_id : item.comment_id
      }`,
      { inc_votes: amount }
    )
    .then(({ data: { article } }) => {
      return article;
    });
};

export const postNewArticle = articleToPost => {
  return axios
    .post(`${url}/articles`, articleToPost)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const postNewComment = (article_id, commentToPost) => {
  return axios
    .post(`${url}/articles/${article_id}/comments`, {
      ...commentToPost
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteArticle = article_id => {
  return axios.delete(`${url}/articles/${article_id}`);
};

import axios from 'axios';

const url = 'http://n-c-news.herokuapp.com/api';

export const fetchTopic = slug => {
  return axios.get(`${url}/topics/${slug}`);
};

export const fetchComments = id => {
  return axios.get(`${url}/articles/${id}/comments`);
};

export const getUsers = () => {
  return axios.get(`${url}/users`);
};

export const getUser = username => {
  return axios.get(`${url}/users/${username}`);
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

export const deleteComment = comment_id => {
  return axios.delete(`${url}/comments/${comment_id}`);
};

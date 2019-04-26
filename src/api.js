import axios from 'axios';

const url = 'https://n-c-news.herokuapp.com/api';

export const fetchArticles = params => {
  let paramString = '';

  if (params) {
    paramString = paramString + '?';

    for (let key in params) {
      paramString = paramString + key + '=' + params[key] + '&';
    }

    paramString = paramString.slice(0, -1);
  }
  return axios.get(`${url}/articles${paramString}`);
};

export const fetchArticle = articleId => {
  return axios.get(`${url}/articles/${articleId}`);
};

export const fetchTopics = () => {
  return axios.get(`${url}/topics/`);
};

export const fetchTopic = slug => {
  return axios.get(`${url}/topics/${slug}`);
};

export const fetchComments = (id, page) => {
  return axios.get(`${url}/articles/${id}/comments?p=${page}`);
};

export const getUsers = () => {
  return axios.get(`${url}/users`);
};

export const getUser = username => {
  return axios.get(`${url}/users/${username}`);
};

export const postNewUser = user => {
  return axios.post(`${url}/users`, user).then(({ data: { user } }) => {
    return user;
  });
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

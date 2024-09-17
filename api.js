import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-es.onrender.com/api",
});

export const fetchArticles = () => {
  return ncNewsApi
    .get(`/articles`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchAllComments = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const upVote = (article_id) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: 1,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const downVote = (article_id) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: -1,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

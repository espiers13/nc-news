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

export const voteFunc = (article_id, vote) => {
  console.log(vote);
  return ncNewsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: vote,
    })
    .then((response) => {
      return response.data.votes;
    });
};

export const postComment = (article_id, commentData) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, commentData)
    .then(({ data }) => {
      return data;
    });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).then((response) => {
    console.log(response);
  });
};

export const fetchAllUsers = () => {
  return ncNewsApi.get(`/users`).then(({ data }) => {
    return data.users;
  });
};

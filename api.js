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

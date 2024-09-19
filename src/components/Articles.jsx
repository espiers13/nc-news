import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { fetchArticles } from "../../api";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArticlesHeader from "./ArticlesHeader";
import ToggleButton from "@mui/material/ToggleButton";
import { fetchArticlesSortBy } from "../../api";
import Stack from "@mui/material/Stack";

function Articles({ loggedInUser, topics }) {
  const allTopics = topics;
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("created_at");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((articles) => {
      setArticlesData(articles);
      setIsLoading(false);
    });
  }, []);

  const handleOrder = (event) => {
    setOrder(event.target.value);
    fetchArticlesSortBy(query, order).then((response) => {
      setArticlesData(response);
    });
  };

  const handleSortBy = (event) => {
    setQuery(event.target.value);
    fetchArticlesSortBy(query, order).then((response) => {
      setArticlesData(response);
    });
  };

  if (isLoading) {
    return (
      <div id="loading">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <>
      <ArticlesHeader topics={allTopics} />

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Typography component="h1">Filter By:</Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        <ToggleButton onClick={handleSortBy} value="created_at">
          Date
        </ToggleButton>
        <ToggleButton onClick={handleSortBy} value="comment_count">
          Comment Count
        </ToggleButton>
        <ToggleButton onClick={handleSortBy} value="votes">
          Votes
        </ToggleButton>
      </Stack>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Typography component="h1">Order By:</Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        <ToggleButton onClick={handleOrder} value="asc">
          Ascending
        </ToggleButton>
        <ToggleButton onClick={handleOrder} value="desc">
          Descending
        </ToggleButton>
      </Stack>

      <Typography
        variant="h2"
        component="h1"
        sx={{ color: "#33272a", marginTop: 5 }}
      >
        All Topics
      </Typography>
      <ImageList
        cols={1}
        gap={15}
        sx={{
          width: "flex",
          height: "flex",
          maxWidth: 5000,
          p: 2,
        }}
      >
        {articlesData.map((article) => (
          <ImageListItem key={article.article_id} cols={1}>
            <img
              srcSet={article.article_img_url}
              src={article.article_img_url}
              alt={article.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={article.title}
              subtitle={`author: ${article.author}
              written: ${new Date(article.created_at).toDateString()} votes: ${
                article.votes
              }`}
              actionIcon={
                <IconButton aria-label={`read ${article.title}`}>
                  <a href={`/articles/${article.article_id}`}>
                    <ReadMoreIcon />
                  </a>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default Articles;

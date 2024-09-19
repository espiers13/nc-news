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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Articles({ loggedInUser, topics }) {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allTopics = topics;

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((articles) => {
      setArticlesData(articles);
      setIsLoading(false);
    });
  }, []);

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
      <header>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: "#33272a", marginTop: 5 }}
        >
          All Articles
        </Typography>
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "#33272a", marginTop: 5 }}
        >
          View By Topic
        </Typography>
      </header>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            aria-label="Topics Menu"
            fullWidth
            sx={{ backgroundColor: "#00473e" }}
          >
            {allTopics.map((topic) => {
              return (
                <Button
                  label={topic.slug}
                  color="#00473e"
                  aria-label={topic.slug}
                  key={topic.slug}
                  disabled={false}
                >
                  <a href={`/${topic.slug}`}>{topic.slug}</a>
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>
      </Box>
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
              subtitle={`${article.author}`}
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

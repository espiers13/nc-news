import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, Button, ButtonGroup } from "@mui/material";
import { fetchArticlesByTopic } from "../../api";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CircularProgress from "@mui/material/CircularProgress";

function TopicPage(topics) {
  const { topic } = useParams();
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allTopics = topics.topics;

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesByTopic(topic).then((articles) => {
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
          {`All articles about: ${topic}`}
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

export default TopicPage;

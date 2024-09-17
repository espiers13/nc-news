import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { fetchArticles } from "../../api";
import { useEffect, useState } from "react";

function Articles() {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        <Typography variant="body1" gutterBottom>
          Loading...
        </Typography>
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
      </header>
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

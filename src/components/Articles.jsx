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

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticlesData(articles);
    });
  }, []);

  return (
    <>
      <header>
        <Typography variant="h2" component="h1" sx={{ color: "#004643" }}>
          All Articles
        </Typography>
      </header>
      <ImageList sx={{ width: "flex", height: "flex", maxWidth: 5000 }}>
        {articlesData.map((article) => (
          <ImageListItem key={article.article_id} cols={2}>
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
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`read ${article.title}`}
                >
                  <a href={``}>
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

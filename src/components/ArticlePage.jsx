import { Typography } from "@mui/material";
import { fetchArticleById } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";

function ArticlePage() {
  const [articleTitle, setArticleTitle] = useState();
  const [articleImg, setArticleImg] = useState();
  const [articleAuthor, setArticleAuthor] = useState();
  const [currentArticle, setCurrentArticle] = useState();
  const [articleDate, setArticleDate] = useState();
  const [voteCount, setvoteCount] = useState();
  const { article_id } = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    fetchArticleById(article_id).then((article) => {
      setArticleTitle(article.title);
      setCurrentArticle(article.body);
      setArticleImg(article.article_img_url);
      setArticleAuthor(article.author);
      setArticleDate(article.created_at);
      setvoteCount(article.votes);
    });
  });

  return (
    <>
      <header id="header">
        <Typography variant="h2" component="h1" sx={{ color: "#33272a" }}>
          {articleTitle}
        </Typography>
        <img src={articleImg} />
      </header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <Item>{`author: ${articleAuthor}`}</Item>
          </Grid>
          <Grid size="grow">
            <Item>{articleDate}</Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#594a4e", p: 2 }}>
        <Typography variant="body1" gutterBottom>
          {currentArticle}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size="grow">
          <Item>{`${voteCount} likes`}</Item>
          <Item>
            <IconButton aria-label="like" color="success">
              <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="dislike" color="error">
              <ThumbDownIcon />
            </IconButton>
          </Item>
        </Grid>
        <Grid size="grow">
          <Item>See comments</Item>
          <Item>Post a comment</Item>
        </Grid>
      </Grid>
    </>
  );
}

export default ArticlePage;

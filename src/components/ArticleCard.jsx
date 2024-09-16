import { Typography } from "@mui/material";
import { fetchArticleById } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ArticleCard() {
  const { article_id } = useParams();
  console.log(article_id);

  return (
    <header>
      <Typography variant="h2" component="h1" sx={{ color: "#004643" }}>
        All Articles
      </Typography>
      <p>hello</p>
    </header>
  );
}

export default ArticleCard;

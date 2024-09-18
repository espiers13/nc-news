import { Typography } from "@mui/material";
import { fetchArticleById, upVote, downVote } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Comments from "./Comments";
import WriteComment from "./WriteComment";
import { Button, Box, Paper, IconButton, Tab, Link } from "@mui/material";

function ArticlePage({ loggedInUser }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("Comments");
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpVote = (event) => {
    const article_id = article.article_id;
    upVote(article_id).then((votes) => {
      setVotes(votes);
    });
  };
  const handleDownVote = (event) => {
    const article_id = article.article_id;
    downVote(article_id).then((votes) => {
      setVotes(votes);
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#00473e",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#f2f7f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#00473e",
    }),
  }));

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
      setVotes(article.votes);
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

  const articleDate = new Date(article.created_at).toDateString();

  return (
    <>
      <header id="header">
        <Typography variant="h2" component="h1">
          {article.title}
        </Typography>
        <img src={article.article_img_url} />
      </header>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <Item>
              <a href="/" underline="none">
                Return to all articles
              </a>
            </Item>
          </Grid>
          <Grid size="grow">
            <Item>{`Author: ${article.author}`}</Item>
          </Grid>
          <Grid size="grow">
            <Item>{`Date Created: ${articleDate}`}</Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#594a4e", p: 2 }}>
        <Typography variant="body1" gutterBottom>
          {article.body}
        </Typography>
      </Box>

      <Item sx={{ maxWidth: "95%", margin: 5 }}>
        <IconButton
          aria-label="like"
          color="success"
          article_id={article_id}
          onClick={handleUpVote}
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="dislike" color="error" onClick={handleDownVote}>
          <ThumbDownIcon />
        </IconButton>
        {`${votes} likes`}
      </Item>

      <Box sx={{ width: "100%", typography: "body1", p: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="View Comments" value="Comments" />
              <Tab label="Leave a Comment" value="WriteComment" />
            </TabList>
          </Box>
          <TabPanel value="Comments">
            <Comments article_id={article_id} />
          </TabPanel>
          <TabPanel value="WriteComment">
            <WriteComment article_id={article_id} loggedInUser={loggedInUser} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default ArticlePage;

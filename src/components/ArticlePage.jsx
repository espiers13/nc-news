import { Typography } from "@mui/material";
import { fetchArticleById, voteFunc } from "../../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Comments from "./Comments";
import WriteComment from "./WriteComment";
import { Box, Paper, Tab } from "@mui/material";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tabs from "@mui/material/Tabs";
import { ArticleError } from "./errors/Errors";

function ArticlePage({ loggedInUser }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("Comments");
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState();
  const [upVote, setUpVote] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVote = (event) => {
    const article_id = article.article_id;
    if (upVote) {
      voteFunc(article_id, 1).then((votes) => {
        setUpVote(false);
        setVotes(votes);
      });
    }
    if (!upVote) {
      voteFunc(article_id, -1).then((votes) => {
        setUpVote(true);
        setVotes(votes);
      });
    }
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
      if (article.status) {
        setErrorAlert(true);
      }
      setArticle(article);
      setVotes(article.votes);
      setIsLoading(false);
    });
  }, []);

  if (errorAlert) {
    return <ArticleError />;
  }

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

      <Box
        sx={{
          maxWidth: "95%",
          textAlign: "center",
          color: "#594a4e",
          p: 1,
        }}
      >
        <Fab size="small" aria-label="like" onClick={handleVote} color="error">
          <FavoriteIcon />
        </Fab>

        {`  ${votes} likes`}
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              onChange={handleChange}
              aria-label="comment-tabs"
              centered={true}
              value={value}
              textColor="inherit"
              indicatorColor="inherit"
            >
              <Tab
                label="View Comments"
                value="Comments"
                sx={{ color: "#00473e" }}
              />
              <Tab
                label="Leave a Comment"
                value="WriteComment"
                sx={{ color: "#00473e" }}
              />
            </Tabs>
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

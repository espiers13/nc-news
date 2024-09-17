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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Comments from "./Comments";
import WriteComment from "./WriteComment";

function ArticlePage() {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("Comments");
  const [article, setArticle] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ffc6c7",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
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
      <header id="header">
        <Typography variant="h2" component="h1" sx={{ color: "#33272a" }}>
          {article.title}
        </Typography>
        <img src={article.article_img_url} />
      </header>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <Item>{`author: ${article.author}`}</Item>
          </Grid>
          <Grid size="grow">
            <Item>{Date(article.created_at)}</Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#594a4e", p: 2 }}>
        <Typography variant="body1" gutterBottom>
          {article.body}
        </Typography>
      </Box>

      <Item sx={{ maxWidth: "95%", margin: 5 }}>
        <IconButton aria-label="like" color="success">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="dislike" color="error">
          <ThumbDownIcon />
        </IconButton>
        {`${article.votes} likes`}
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
            <WriteComment />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default ArticlePage;

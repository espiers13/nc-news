import { fetchAllComments } from "../../api";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Comments({ article_id, loggedInUser }) {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllComments(article_id).then((comments) => {
      setArticleComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box alignContent="center" sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!articleComments.length) {
    return (
      <Typography variant="body1" color="#594a4e">
        No comments to display
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {articleComments.map((comment) => {
          return (
            <CommentCard
              author={comment.author}
              body={comment.body}
              date={Date(comment.created_at)}
              votes={comment.votes}
              comment_id={comment.comment_id}
              key={comment.comment_id}
              loggedInUser={loggedInUser}
              setArticleComments={setArticleComments}
              articleComments={articleComments}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export default Comments;

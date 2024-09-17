import { fetchAllComments } from "../../api";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function Comments({ article_id }) {
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
      <div id="loading">
        <Typography variant="body1" gutterBottom>
          Loading...
        </Typography>
      </div>
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
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export default Comments;

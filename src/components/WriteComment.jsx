import { postComment } from "../../api";
import { useState } from "react";
import { FormHelperText, TextField, Button, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function WriteComment({ loggedInUser, article_id }) {
  const [newComment, setNewComment] = useState("");
  const [returnedComment, setReturnedComment] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const currentArticle_id = article_id;

  const handleComment = (event) => {
    const comment = event.target.value;
    setCommentError(false);
    setNewComment(comment);
  };

  const handleSubmit = (event) => {
    const commentData = {
      username: loggedInUser,
      body: newComment,
    };

    if (commentData.body) {
      console.log(commentData.body);
      setButtonPressed(true);

      postComment(currentArticle_id, commentData).then((comment) => {
        setReturnedComment(comment.body);
      });
    } else {
      setCommentMessage(`You must write a comment`);
      setCommentError(true);
    }
  };

  if (commentError) {
  }

  return (
    <>
      <Box
        sx={{ minWidth: 100 }}
        margin={3}
        display="flex"
        alignItems="left"
        justifyContent="left"
      >
        <FormHelperText>{`You are writing a comment as ${loggedInUser}`}</FormHelperText>
      </Box>
      <Box
        sx={{ minWidth: 100 }}
        margin={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          required
          fullWidth
          label="Write comment here..."
          multiline
          rows={6}
          error={commentError}
          onChange={handleComment}
          disabled={buttonPressed}
          defaultValue={returnedComment}
          color="#004643"
        ></TextField>
      </Box>
      <Box
        sx={{ minWidth: 100, minHeight: 5, maxHeight: 5 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FormHelperText>{commentMessage}</FormHelperText>
      </Box>
      <Box
        sx={{ minWidth: 100 }}
        margin={1.5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingButton
          variant="contained"
          sx={{ bgcolor: "#e16162" }}
          loading={isLoading}
          disabled={buttonPressed}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
}

export default WriteComment;

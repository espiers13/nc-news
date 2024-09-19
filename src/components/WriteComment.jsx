import { postComment } from "../../api";
import { useState } from "react";
import { FormHelperText, TextField, Button, Box } from "@mui/material";

function WriteComment({ loggedInUser, article_id }) {
  const [newComment, setNewComment] = useState("");
  const [returnedComment, setReturnedComment] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const currentArticle_id = article_id;

  const handleComment = (event) => {
    const comment = event.target.value;
    setNewComment(comment);
    location.reload();
  };

  const handleSubmit = (event) => {
    const commentData = {
      username: loggedInUser,
      body: newComment,
    };
    setButtonPressed(true);
    postComment(currentArticle_id, commentData).then((comment) => {
      setReturnedComment(comment.body);
    });
  };

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
          fullWidth
          label="Write comment here..."
          multiline
          rows={6}
          onChange={handleComment}
          disabled={buttonPressed}
          defaultValue={returnedComment}
        ></TextField>
      </Box>
      <Box
        sx={{ minWidth: 100 }}
        margin={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "#ff8ba7" }}
          disabled={buttonPressed}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default WriteComment;

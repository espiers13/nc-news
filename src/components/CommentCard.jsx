import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteComment } from "../../api";
import { MenuItem, Menu, Button, Fab, Card } from "@mui/material";

function CommentCard({
  author,
  body,
  date,
  votes,
  comment_id,
  setArticleComments,
  articleComments,
}) {
  const handleDelete = (event) => {
    deleteComment(comment_id).then(() => {
      setArticleComments(
        articleComments.filter((comment) => comment.comment_id !== comment_id)
      );
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: "95%", bgcolor: "#fffffe", p: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {author}
        </Typography>
        <Typography variant="body1" component="div">
          {body}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2">{`Likes: ${votes}`}</Typography>
        <Fab size="small" aria-label="like">
          <FavoriteIcon />
        </Fab>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Options
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Like</MenuItem>
          </Menu>
        </div>
      </CardActions>
    </Card>
  );
}

export default CommentCard;

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";

function CommentCard({ author, body, date, votes }) {
  return (
    <Card sx={{ maxWidth: "95%", bgcolor: "#fffffe" }}>
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
        <Typography variant="body2">{`Votes: ${votes}`}</Typography>
        <IconButton aria-label="like" color="success">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="dislike" color="error">
          <ThumbDownIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CommentCard;

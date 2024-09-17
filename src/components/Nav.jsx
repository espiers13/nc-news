import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

const buttons = [
  <Button className="button" key="articles">
    <a href="/articles">Articles</a>
  </Button>,
  <Button className="button" key="my-profile">
    <a href="/:user_id">My Profile</a>
  </Button>,
  <Button className="button" key="change-user">
    <a href="/">Change User</a>
  </Button>,
];

function Nav() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "none",
        minWidth: "95%",
        width: "grow",
      }}
    >
      <ButtonGroup size="large" aria-label="Navigation Bar">
        {buttons}
      </ButtonGroup>
    </Box>
  );
}

export default Nav;

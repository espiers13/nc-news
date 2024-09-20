import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Nav from "./Nav";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

function Header({ loggedInUser, setLoggedInUser }) {
  const Banner = styled(Paper)(({ theme }) => ({
    backgroundColor: "#004643",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#00473e",
    ...theme.applyStyles("dark", {
      backgroundColor: "#16161a",
      color: "#fffffe",
      size: "100vw",
      minWidth: "95%",
    }),
  }));

  return (
    <Box
      sx={{
        flexGrow: 1,
        minWidth: "95%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={1}>
        <Grid size={100}>
          <Banner>
            <header id="header">
              <Typography variant="h1" component="h1" sx={{ color: "#fffffe" }}>
                NC News
              </Typography>
            </header>
          </Banner>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;

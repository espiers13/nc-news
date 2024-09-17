import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Nav from "./Nav";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

function Header() {
  const Banner = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ff8ba7",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      size: "100vw",
      minWidth: "95%",
    }),
  }));
  return (
    <Box sx={{ flexGrow: 1, minWidth: "95%" }}>
      <Grid container spacing={1}>
        <Grid size={100}>
          <header id="header">
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: "#33272a", minWidth: "95%" }}
            >
              NC News
            </Typography>
          </header>
        </Grid>
        <Grid size="grow">
          <Banner sx={{ margin: 5 }}>
            <Nav />
          </Banner>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;

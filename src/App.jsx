import { Route, Routes } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./App.css";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ArticleCard from "./components/ArticleCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={100}>
            <Item>
              {" "}
              <Header />
            </Item>
          </Grid>
          <Grid size="grow">
            <Item>
              {" "}
              <Nav />
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/" element={<Login />} />
        <Route path="/:user_id" element={<UserProfile />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
      </Routes>
    </>
  );
}

export default App;

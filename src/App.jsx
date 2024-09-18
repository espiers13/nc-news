import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import ArticlePage from "./components/ArticlePage";
import { UserContext } from "./components/contexts/UsersContext";
import {
  InputLabel,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { fetchAllUsers } from "../api";
import "./App.css";

function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loginMsg, setLoginMsg] = useState(`You are logged in as tickle122`);

  const handleUser = (event) => {
    // console.log(event.target.value);
    setLoggedInUser(event.target.value);
    setLoginMsg(`You are logged in as ${event.target.value}`);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers().then((users) => {
      // console.log(users, "<--users");
      setAllUsers(users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // const users = [
  //   {
  //     username: "tickle122",
  //     name: "Tom Tickle",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  //   },
  //   {
  //     username: "grumpy19",
  //     name: "Paul Grump",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  //   },
  //   {
  //     username: "happyamy2016",
  //     name: "Amy Happy",
  //     avatar_url:
  //       "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  //   },
  //   {
  //     username: "cooljmessy",
  //     name: "Peter Messy",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  //   },
  //   {
  //     username: "weegembump",
  //     name: "Gemma Bump",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  //   },
  //   {
  //     username: "jessjelly",
  //     name: "Jess Jelly",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  //   },
  // ];

  return (
    <>
      <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      {/*NEW STUFF*/}
      <Box alignSelf="center" textAlign="center">
        <Typography
          variant="h5"
          component="h5"
          sx={{ color: "#00473e", minWidth: "50px" }}
        >
          {loginMsg}
        </Typography>
        <InputLabel id="user-select-label">Username</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={loggedInUser}
          label="Username"
          onChange={handleUser}
        >
          <MenuItem key="select new">Select a user</MenuItem>
          {allUsers.map((user) => {
            return (
              <MenuItem key={user.username} value={user.username}>
                {user.username}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {/*NEW STUFF*/}
      <Routes>
        <Route path="/" element={<Articles loggedInUser={loggedInUser} />} />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage loggedInUser={loggedInUser} />}
        />
      </Routes>
    </>
  );
}

export default App;

// {allUsers.map((user) => {
//   return (
//     <MenuItem key={user.username} value={user.username}>
//       {user.username}
//     </MenuItem>
//   );
// })}

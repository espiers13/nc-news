import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Articles from "./components/Articles";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/" element={<Login />} />
        <Route path="/:user_id" element={<UserProfile />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;

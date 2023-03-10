import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./assets/styles/main.css";
import MainLayout from "./layouts/MainLayout";
import Post from "./pages/Post";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <MainLayout>
              <Post />
            </MainLayout>
          }
        />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;

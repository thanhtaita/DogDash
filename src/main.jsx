import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from "../routes/DetailView";
import NavBar from "../routes/NavBar";
import { Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index={true} path="/" element={<App />} />
          <Route
            index={false}
            path="/DogDetail/:symbol"
            element={<DetailView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

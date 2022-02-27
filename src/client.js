import React from "react";
import ReactDOM from "react-dom";
import useFetch from "react-fetch-hook";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";

function App() {
  const { isLoading, data } = useFetch("http://localhost:4001");
  if (isLoading) {
    return "Loading...";
  }
  return <Home />;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);

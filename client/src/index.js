import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
=======

ReactDOM.render(
  <Router>
    <App />
>>>>>>> 04b4c873f1c5bac82b9507908d2dbbe29c3489e4
  </Router>,
  document.getElementById("root")
);

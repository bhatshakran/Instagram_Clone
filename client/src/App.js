import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch></Switch>
    </div>
  );
}

export default App;

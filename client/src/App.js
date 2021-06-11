import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <div className="App lg:container mx-auto">
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

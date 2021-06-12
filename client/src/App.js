import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="mx-auto App lg:container">
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

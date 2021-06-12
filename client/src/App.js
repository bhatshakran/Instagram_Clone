import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="mx-auto App lg:container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

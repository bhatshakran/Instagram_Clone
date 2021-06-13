import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreatePost from "./components/Posts/CreatePost";
import { Redirect } from "react-router-dom";

function App() {
  let token = useSelector((state) => state.auth);

  let auth;
  if (token.token !== "") {
    auth = true;
  } else {
    auth = false;
    console.log("not auth");
  }

  // const auth = true;
  return (
    <div className="mx-auto App lg:container">
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (auth) {
              return <Homepage />;
            } else {
              return <Login />;
            }
          }}
        />
        <Route
          path="/login"
          render={() => {
            if (auth) {
              return <Redirect to="/" />;
            } else {
              return <Login />;
            }
          }}
        />
        <Route path="/signup" component={Signup} />
        <Route
          path="/add_post"
          render={() => {
            if (!auth) {
              return <Redirect to="/login" />;
            } else {
              return <CreatePost />;
            }
          }}
        />
      </Switch>
    </div>
  );
}

export default App;

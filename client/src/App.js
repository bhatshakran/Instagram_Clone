import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreatePost from "./components/Posts/CreatePost";
import { Redirect } from "react-router-dom";
import Bottombar from "./components/Layout/Bottombar";
import ViewComments from "./components/Comments/ViewComments";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import User from "./components/User/User";

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
        <Route
          path="/viewcomments/:id"
          render={(props) => {
            if (!auth) {
              return <Redirect to="/login" />;
            } else {
              return <ViewComments {...props} />;
            }
          }}
        />
        <Route
          path="/profile"
          render={(props) => {
            if (!auth) {
              return <Redirect to="/login" />;
            } else {
              return <Profile {...props} />;
            }
          }}
        />
        <Route
          path="/editprofile"
          render={(props) => {
            if (!auth) {
              return <Redirect to="/login" />;
            } else {
              return <EditProfile {...props} />;
            }
          }}
        />
        <Route
          path="/user/:id"
          render={(props) => {
            if (!auth) {
              return <Redirect to="/login" />;
            } else {
              return <User {...props} />;
            }
          }}
        />
      </Switch>
      {auth ? <Bottombar /> : ""}
    </div>
  );
}

export default App;

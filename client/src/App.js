import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {Redirect} from 'react-router-dom'

function App() {
  
  let token = useSelector((state) => state.auth);
  console.log(token)
  // let actoken = token.token;
  let auth;
  if(token.token !== ''){
    auth = true
  }else {
    auth = false
    console.log('not auth')
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
        <Route path="/login" 
        render={() => {
          if (auth) {
            return < Redirect to = '/' />;
          } else {
            return <Login />;
          }
        }}
        />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

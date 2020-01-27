import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "./Home";
import GameForm from "./GameForm";
import Gameboard from "../gameboard/GameboardWrapper";
import store from "../store/app-store";
import Login from "../users/Login";
import Signup from "../users/Signup";
import Admin from "../users/Admin";
import { AuthContext } from "../context/auth";

function App(props) {
  const [authToken, setAuthToken] = useState();
  const [authAdmin, setAuthAdmin] = useState(false);
  const [username, setUsername] = useState();

  const setUserToken = data => setAuthToken(data);
  const setAdmin = value => setAuthAdmin(value);
  const setUser = username => setUsername(username);

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          authToken,
          setAuthToken: setUserToken,
          authAdmin,
          setAuthAdmin: setAdmin
        }}
      >
        <Router>
          <h1>Puissance 4</h1>
          <Route
            path="/login"
            render={props => <Login {...props} setUser={setUser} />}
          />
          <Route path="/signup" component={Signup} />
          <PublicRoute
            exact
            path="/"
            component={Home}
            restricted={true}
            username={username}
          />
          <PublicRoute
            path="/form"
            component={GameForm}
            restricted={true}
            username={username}
          />
          <PublicRoute
            path="/gameboard"
            component={Gameboard}
            restricted={true}
            username={username}
          />
          <PrivateRoute path="/admin" component={Admin} />
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;

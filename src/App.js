import React from "react";
import "./App.css";
import Home from "./components/Home";
import EventCreator from "./components/EventCreator";
import { toast } from "react-toastify";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  ReactGA.initialize("UA-121909234-2");
  ReactGA.pageview(window.location.pathname + window.location.search);
  toast.configure();
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/test">
            <EventCreator />
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

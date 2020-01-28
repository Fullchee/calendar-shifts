import React from "react";
import "./App.css";
import Home from "./components/Home";
import { toast } from "react-toastify";
import ReactGA from "react-ga";
ReactGA.initialize("UA-121909234-2");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  toast.configure();
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;

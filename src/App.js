import React from "react";
import "./App.css";
import Home from "./components/Home";
import { toast } from "react-toastify";

function App() {
  toast.configure();
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;

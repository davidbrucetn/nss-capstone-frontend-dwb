import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// Child Component
import CovidDining from "./App"


ReactDOM.render(
  <Router>
    <CovidDining />
  </Router>,
  document.getElementById("root")
);




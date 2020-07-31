import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// Child Component
import CovidDining from "./App"


ReactDOM.render(
  <Router>
    <CovidDining />
  </Router>,
  document.getElementById("root")
);




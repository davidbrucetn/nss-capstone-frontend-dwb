import React from "react";
import {  NavLink, withRouter  } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {

  const handleLogout = () => {
    props.clearUser();
    props.history.push('/');
  }

  return (
    <header>
      <h1 className="site-title">
      Covid-Dining        <br />
        <small>Because you want to be smarter about dining out</small>
      </h1>
      <nav>
        <ul className="container">
          <li>
            <NavLink className="nav-link" activeClassName="selected" exact to="/">
              Home
            </NavLink>
          </li>
          
          {props.hasUser
            ? 
          <li>
            <NavLink className="nav-link" activeClassName="selected" exact to="/restaurant">
              Find Restaurants
            </NavLink>
          </li> 
          : null }
          
          {props.hasUser
            ? 
          <li>
            <NavLink className="nav-link" activeClassName="selected" exact to="/collection">
              Your Collection
            </NavLink>
          </li> 
          : null }
                   
           {props.hasUser
            ?<li>
            <span className="nav-link" onClick={handleLogout}> Logout </span>
          </li>
            :  <li>
            <NavLink className="nav-link" to="/login"> Login </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
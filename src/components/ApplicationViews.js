import { Route, Redirect } from "react-router-dom";
import React from "react";

import Login from "./auth/Login";
import Home from "./home/Home";
import RestaurantList from "./restaurant/RestaurantList"
import RestaurantDetail from "./restaurant/RestaurantDetails"

const ApplicationViews = (props) => {

  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (

    <React.Fragment>

      <Route path="/login" render={props => {
        return <Login setUser={setUser} {...props} />
      }}
      />

      <Route
        exact path="/" render={props => {
          if (hasUser) {
            return <Home />;
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route exact path="/restaurant" render={props => <RestaurantList />} />
      <Route exact path="/restaurant/:locationId(\d+)" render={props => {
        if (hasUser) {
          return <RestaurantDetail locationId={parseInt(props.match.params.locationId)} restaurant={props.restaurant} {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />

    </React.Fragment>
  );
};

export default ApplicationViews;
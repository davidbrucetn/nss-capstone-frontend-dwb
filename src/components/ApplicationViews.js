import { Route, Redirect } from "react-router-dom";
import React, {useState} from "react";

import RegistrationForm from "./auth/Registration"
import Login from "./auth/Login";
import AlertComponent from "./auth/AlertComponent"
import Home from "./home/Home";
import RestaurantList from "./restaurant/RestaurantList"
import RestaurantDetail from "./restaurant/RestaurantDetails"
import CollectionList from "./collection/CollectionList";

const ApplicationViews = (props) => {

  const hasUser = props.hasUser;
  const setUser = props.setUser;

  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (

    <React.Fragment>

      <Route path="/login" render={props => {
        return <Login setUser={setUser} showError={updateErrorMessage} updateTitle={updateTitle} {...props} />
      }}
      />
      <Route path="/registration" render={props => {
        return <RegistrationForm setUser={setUser} showError={updateErrorMessage} updateTitle={updateTitle} {...props} />
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
      <Route exact path="/collection" render={props => <CollectionList />} />
      <Route exact path="/collection/:id(\d+)" render={props => {
        if (hasUser) {
          return <RestaurantDetail locationId={parseInt(props.match.params.id)} restaurant={props.restaurant} {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
    </React.Fragment>
  );
};

export default ApplicationViews;
import { Route, Redirect,withRouter } from "react-router-dom";
import React, {useState} from "react";

import RegistrationForm from "./auth/Registration"
import Login from "./auth/Login";
import AlertComponent from "./auth/AlertComponent"
import Home from "./home/Home";
import RestaurantList from "./restaurant/RestaurantList"
import RestaurantDetail from "./restaurant/RestaurantDetails"
import CollectionList from "./collection/CollectionList";
import UserSettings from "./auth/UserSettings"

const ApplicationViews = (props) => {

  const hasUser = props.hasUser;
  const setUser = props.setUser;

  const [ updateTitle] = useState(null);
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
      <Route exact path="/restaurant" render={props => <RestaurantList  {...props} />} />
      <Route exact path="/restaurant/:state/:city" render={props => <RestaurantList  {...props} />} />
      <Route exact path="/delivery/:state/:city" render={props => <RestaurantList  diningOptions="10600" {...props} />} />
      <Route exact path="/drivethru/:state/:city" render={props => <RestaurantList  diningOptions="20992" {...props} />} />
      <Route exact path="/outdoor/:state/:city" render={props => <RestaurantList  diningOptions="10603" {...props} />} />
      <Route exact path="/takeout/:state/:city" render={props => <RestaurantList  diningOptions="10601" {...props} />} />

      <Route exact path="/saveddelivery" render={props => <CollectionList  diningOptions="10600" {...props} />} />
      <Route exact path="/saveddrivethru" render={props => <CollectionList  diningOptions="20992" {...props} />} />
      <Route exact path="/savedoutdoor" render={props => <CollectionList  diningOptions="10603" {...props} />} />
      <Route exact path="/savedtakeout" render={props => <CollectionList  diningOptions="10601" {...props} />} />

      <Route exact path="/restaurant/:state/:city/:locationId(\d+)/details" render={props => {
        if (hasUser) {
          return <RestaurantDetail locationId={parseInt(props.match.params.locationId)} restaurant={props.restaurant} {...props}  />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/collection" render={props => <CollectionList {...props}/>} />
     
      <Route exact path="/collection/:id(\d+)/details" render={props => {
        if (hasUser) {
          return <RestaurantDetail locationId={parseInt(props.match.params.id)} restaurant={props.restaurant} {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/usersettings" render={props => {
        if (hasUser) {
          return <UserSettings setUser={setUser} showError={updateErrorMessage} updateTitle={updateTitle} {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />

      <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
import React, { useState, useEffect } from 'react';
//import the components we will need
import RestaurantCard from "./RestaurantCard"
import APIManager from "../../modules/APIManager";

const RestaurantList = (props) => {
  // The initial state is an empty array
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = () => {

    const filters = [ { filter: "Outdoor Seating", code: 1603}, { filter: "Delivery", code: ""}]
    const locations = [ {city: "Franklin", locationId: "5562736"},{city: "Nashville", locationId: "55229"} ]
    const locationFind = locations.splice(locations.findIndex(location => location.city === "Nashville"), 1)

    let filterCodes = filters;
    // After the data comes back from the API, we
    //  use the setOwners function to update state
    
    // return APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
    return APIManager.getDummyList()
    .then(response => {
        setRestaurants(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
        });
  };

  // APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
  // .then(response => {
  //   setRestaurants(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
  //         });
  //   };


  // got the owners from the API on the component's first render
  useEffect(() => {
    getRestaurants()
  }, []);

  // Finally we use map() to "loop over" the owners array to show a list of owner cards
  return (
    <>
      <section className="section__content">
        <div className="container__parent">
          <div className="container__header">
            RestaurantList
          </div>
          <div className="container-cards">
            {restaurants.map(restaurant => <RestaurantCard key={restaurant.location_id} restaurant={restaurant}  />)}
          </div>
      </div>
      </section>
    </>
  );
};
export default RestaurantList
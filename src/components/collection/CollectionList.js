import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
//import the components we will need
import CollectedRestaurantCard from "./CollectedRestaurantCard"
import APIManager from "../../modules/APIManager";
import Helper from "../../modules/Helper"

const CollectionList = (props) => {
  // The initial state is an empty array
  const [collection, setCollection] = useState([]);

  const getCollection = () => {

    const filters = [ { filter: "Outdoor Seating", code: 1603}, { filter: "Delivery", code: ""}]
    const locations = [ {city: "Franklin", locationId: "5562736"},{city: "Nashville", locationId: "55229"} ]
    const locationFind = locations.splice(locations.findIndex(location => location.city === "Nashville"), 1)

    const activeUserId = Helper.getActiveUserId();

    
    
    let filterCodes = filters;
    // After the data comes back from the API, we
    //  use the setOwners function to update state
    
    // return APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
    return APIManager.getCollection(activeUserId)
    .then(response => {
        setCollection(response);
        });
  };

  // APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
  // .then(response => {
  //   setCollection(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
  //         });
  //   };


  // got the owners from the API on the component's first render
  useEffect(() => {
    getCollection()
  }, []);

  // Finally we use map() to "loop over" the owners array to show a list of owner cards
  return (
    <>
      <section className="section__content">
        <div className="container__parent">
          <div className="container__header">
            CollectionList
          </div>
          <div className="container-cards">
            {collection.map(restaurant => <CollectedRestaurantCard key={restaurant.id} restaurant={restaurant} />)}
          </div>
      </div>
      </section>
    </>
  );
};
export default withRouter(CollectionList);
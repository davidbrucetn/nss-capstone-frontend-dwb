import React, { useState, useEffect } from 'react';
//import the components we will need
import RestaurantCard from "./RestaurantCard"
import APIManager from "../../modules/APIManager";
import Helper from "../../modules/Helper"

const RestaurantList = (props) => {
  // The initial state is an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [collection, setCollection ] = useState([])
  const [ diningType, setDiningType ] = useState("")
  let textDiningType = "";
  

  const getRestaurants = () => {

    const activeUserId = Helper.getActiveUserId();
    const filterCodes = [];
    

    // const locations = [ {city: "Franklin", locationId: "5562736"},{city: "Nashville", locationId: "55229"} ]
    // const locationFind = locations.splice(locations.findIndex(location => location.city === "Nashville"), 1)
    if (props.diningOptions !== undefined) {
      textDiningType = Helper.diningOptionMatch(props.diningOptions)

      if (textDiningType !== "") {
        filterCodes.push(props.diningOptions)
        setDiningType(textDiningType)
        
      }
    } else {
        setDiningType("All")
    }
    
    
    
    // let filterCodes = filters;
    // After the data comes back from the API, we
    //  use the setOwners function to update state
    
    // return APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
    return APIManager.getDummyList()
    .then(response => {
        setRestaurants(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
        })
        .then(() => {
          APIManager.getCollection(activeUserId)
          .then(response => {
            setCollection(response)
            setIsLoading(false)
          })
        })
  };

  // APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
  // .then(response => {
  //   setRestaurants(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
  //         });
  //   };


  // got the owners from the API on the component's first render
  useEffect(() => {
    getRestaurants()
  }, [isLoading]);

  // Finally we use map() to "loop over" the owners array to show a list of owner cards
  return (
    <>
      <section className="section__content">
        <div className="container__parent">
          <div className="container__header">
            Restaurants - Dining Option: {diningType.filter}
          </div>
          <div className="container-cards">
            {restaurants.map(restaurant => <RestaurantCard key={restaurant.location_id} restaurant={restaurant} diningType = {diningType} collection={collection.filter(collectionItem => collectionItem.location_id === restaurant.location_id)} history={props.history} />)}
          </div>
      </div>
      </section>
    </>
  );
};
export default RestaurantList
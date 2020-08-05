import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
//import the components we will need
import RestaurantCard from "./RestaurantCard"
import APIManager from "../../modules/APIManager";
import Helper from "../../modules/Helper"

const RestaurantList = (props) => {
  // The initial state is an empty array
  const [ isLoading, setIsLoading ] = useState(true);
  const [ restaurants, setRestaurants ] = useState([]);
  const [ collection, setCollection ] = useState([])
  const [ diningType, setDiningType ] = useState("")

  let textDiningType = "";
  

  const getRestaurants = () => {

    const activeUserId = Helper.getActiveUserId();
    const filterCodes = [];
    let TAlocation = {};
    const cityStateTemp = {
      city: props.match.params.city,
      state: props.match.params.state
    }

      if (props.diningOptions !== undefined) {
      textDiningType = Helper.diningOptionMatch(props.diningOptions)

      if (textDiningType !== "") {
        filterCodes.push(props.diningOptions)
        setDiningType(textDiningType)
      }
    } else {
        const filterCode = { filter: "All", code: "all"}
        filterCodes.push("all")
        setDiningType(filterCode)
    }
    
    if (props.match.params.city === undefined ) {
      TAlocation.city = "Nashville";
      TAlocation.state = "Tennessee"
    } else {
      TAlocation.city = props.match.params.city
      TAlocation.state = props.match.params.state
    }
    
    

    let tempLocationID = "";

  
      // return APIManager.getDummyList()
      return APIManager.getTripAdvisorLocationCode(TAlocation)
        .then(response => {
          tempLocationID = response.data[0].result_object.location_id
            APIManager.getTripAdvisorListByLocation(response.data[0].result_object.location_id,filterCodes)
            .then(response => {
              setRestaurants(response.data.filter(restaurant => restaurant.location_id !== tempLocationID ));
              })
              .then(() => {
                APIManager.getCollection(activeUserId)
                .then(response => {
                  setCollection(response)
                  setIsLoading(false)
                })
              })
            
        })
  
      // return APIManager.getDummyList()
      
  };

  // APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
  // .then(response => {
  //   setRestaurants(response.data.filter(restaurant => restaurant.location_id !== "55229" ));
  //         });
  //   };


  // got the owners from the API on the component's first render
  useEffect(() => {
    getRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {restaurants.map(restaurant => <RestaurantCard key={restaurant.location_id} restaurant={restaurant}  {...props} diningType = {diningType} collection={collection.filter(collectionItem => collectionItem.location_id === restaurant.location_id)} history={props.history} />)}
          </div>
      </div>
      </section>
    </>
  );
};
export default withRouter(RestaurantList);
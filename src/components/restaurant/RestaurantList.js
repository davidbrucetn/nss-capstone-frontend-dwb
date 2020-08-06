import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import RestaurantCard from "./RestaurantCard"
import APIManager from "../../modules/APIManager";
import Helper from "../../modules/Helper"

const RestaurantList = (props) => {
  // The initial state is an empty array
  const [ isLoading, setIsLoading ] = useState(true);
  const [ activeUserId, setActiveUserId ] = useState("");
  const [ restaurants, setRestaurants ] = useState([]);
  const [ collection, setCollection ] = useState([])
  const [ diningType, setDiningType ] = useState("")
  const [ TAlocation, setTAlocation ] = useState({})

  let textDiningType = "";
  

  const getRestaurants = () => {

    const userEmail=Helper.getActiveUserEmail();
    APIManager.getUserbyEmail(userEmail)
    .then((userObjectArray) => {
      setActiveUserId(userObjectArray[0].id)
    })
    const filterCodes = [];
    const tempTAlocation = {};
    
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
      tempTAlocation.city = "Nashville";
      tempTAlocation.state = "Tennessee"
      setTAlocation(tempTAlocation)
    } else {
      tempTAlocation.city = props.match.params.city
      tempTAlocation.state = props.match.params.state
      setTAlocation(tempTAlocation)
    }
    
    

    let tempLocationID = "";

  

      return APIManager.getTripAdvisorLocationCode(tempTAlocation)
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
  
      
  };


  useEffect(() => {
    getRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);


  return (
    <>
      <section className="section__content">
        <div className="container__parent">
          <div className="container__header">
            Restaurants - Dining Option: {diningType.filter} { (TAlocation.city !== "") && `${TAlocation.city}, ${TAlocation.state}` }
          </div>
          
          <div className="card-deck">

            {restaurants.map(restaurant => <RestaurantCard key={restaurant.location_id} restaurant={restaurant}  {...props} diningType = {diningType} collection={collection.filter(collectionItem => collectionItem.location_id === restaurant.location_id)} history={props.history} />)}
          
          </div>
        
        </div>
      </section>
    </>
  );
};
export default withRouter(RestaurantList);
import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
//import the components we will need
import CollectedRestaurantCard from "./CollectedRestaurantCard"
import APIManager from "../../modules/APIManager";
import Helper from "../../modules/Helper"





const CollectionList = (props) => {
  // The initial state is an empty array
  const [collection, setCollection] = useState([]);
  const [ diningType, setDiningType ] = useState("")

  let textDiningType = "";

  const getCollection = () => {

    const activeUserId = Helper.getActiveUserId();
    let filterCodes = [];
    let TAlocation = {};
    let textDiningType = "";
    
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
    
    // return APIManager.getCollection(activeUserId)
    return APIManager.getCollectionDiningOptions(activeUserId,filterCodes)
    .then(response => {
        setCollection(response);
        });
  };

 
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
            Your Collection - Dining Option: {diningType.filter}
          </div>
          <div className="card-deck">

                {collection.map(restaurant => <CollectedRestaurantCard key={restaurant.id} restaurant={restaurant} />)}

          </div>


      </div>
      </section>
    </>
  );
};
export default withRouter(CollectionList);
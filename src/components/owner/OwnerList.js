import React, { useState, useEffect } from 'react';
//import the components we will need
import OwnerCard from './OwnerCard';
import APIManager from "../../modules/APIManager";

const OwnerList = (props) => {
  // The initial state is an empty array
  const [owners, setOwners] = useState([]);

  const getOwners = () => {
    // After the data comes back from the API, we
    //  use the setOwners function to update state

    return APIManager.getAllWithExpandedLocation("owners").then(ownersFromAPI => {
      setOwners(ownersFromAPI)
    });
  };

  // got the owners from the API on the component's first render
  useEffect(() => {
    getOwners()
  }, []);

  // Finally we use map() to "loop over" the owners array to show a list of owner cards
  return (
    <>
      <div className="container-cards">
        {owners.map(owner => <OwnerCard key={owner.id} owner={owner} kennel={owner.location.name} />)}
      </div>
    </>
  );
};
export default OwnerList
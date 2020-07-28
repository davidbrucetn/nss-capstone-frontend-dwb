import React, { useState, useEffect } from 'react';
import APIManager from '../../modules/APIManager'
import './RestaurantDetail.css'


const RestaurantDetail = props => {
  const [restaurant, setRestaurant] = useState({ name: "", location_id: "" });
  const [ mediumPhoto, setMediumPhoto ] = useState("")
  const [ addr2, setAddr2 ] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  const handleSave = () => {
   
    setIsLoading(true);
    APIManager.delete(restaurant.location_id,"restaurants").then(() =>
      props.history.push("/restaurant")
    );
  };

  const handleDelete = () => {
   
    setIsLoading(true);
    APIManager.delete(restaurant.location_id,"restaurants").then(() =>
      props.history.push("/restaurant")
    );
  };

    useEffect(() => {
      APIManager.getTripAdvisorDetails(props.locationId)
      .then(restaurant => {
       setMediumPhoto((restaurant.photo.images.medium.url === null || restaurant.photo.images.medium.url === "") ? "":<img src={restaurant.photo.images.medium.url} alt={restaurant.name} />);
       
       
       setAddr2((restaurant.address_obj.street2 !==null && restaurant.address_obj.street2 !== "") ? (<p> {restaurant.address_obj.street2} </p>):null)
       setRestaurant(restaurant)
       setIsLoading(false)      
        
        })
    
  
},[props.locationId])

  return (
    (!isLoading) ? 
    <div className="card">
      <div className="card-content">
        <picture>
          {mediumPhoto}
        </picture>
        
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{restaurant.name}</span></h3>
        <div className="div__detail">
        <address>
              <p>{restaurant.address_obj.street1}</p>
              {addr2}
              <p>{restaurant.address_obj.city}, {restaurant.address_obj.state}  {restaurant.address_obj.postalcode}</p>
            </address>
            <p>Phone:  {restaurant.phone}</p>
        </div>
        <button type="button" disabled={isLoading} onClick={handleSave}>
          Save to Collection
        </button>
        <button type="button" disabled={isLoading} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
    :null
  );
}

export default RestaurantDetail;
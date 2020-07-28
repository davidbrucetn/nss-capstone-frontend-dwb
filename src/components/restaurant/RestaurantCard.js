import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {

    let smallPhoto= props.restaurant.photo.images.small.url
    const pictureHTML = (smallPhoto === null || smallPhoto === "") ? "":<img src={props.restaurant.photo.images.small.url} alt={props.restaurant.name} />

    const addr2 = (props.restaurant.address_obj.street2 !==null && props.restaurant.address_obj.street2 !== "") ? (<p> {props.restaurant.address_obj.street2} </p>):null
  
  
  return (
    <div className="card">
        <div className="card__image">
             <picture>
              {pictureHTML}
            </picture>
          </div>
      <div className="card-content">
      <div className="card__inner">
         
        </div>
        <div className="div__card__name">
          <h3 className="header__card__name">
            <span className="card-restaurantName">{props.restaurant.name}</span>
          </h3>
        </div>
            <address>
              <p>{props.restaurant.address_obj.street1}</p>
              {addr2}
              <p>{props.restaurant.address_obj.city}, {props.restaurant.address_obj.state}  {props.restaurant.address_obj.postalcode}</p>
            </address>
            <p>Phone:  {props.restaurant.phone}</p>
            <Link to={`/restaurant/${props.restaurant.location_id}`}>
              <button>Details</button>
            </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
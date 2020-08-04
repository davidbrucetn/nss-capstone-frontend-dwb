import  React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import APIManager from "../../modules/APIManager"
import "../../App.css"
import { MdFavorite as CollectionDeleteItem } from "react-icons/md"
import { GoInfo as DetailsIcon } from "react-icons/go"
import Helper from "../../modules/Helper";

const CollectedRestaurantCard = (props) => {
  const [ isLoading, setIsLoading ] = useState(false);
    
  let smallPhoto= props.restaurant.photo.images.small.url
  const pictureHTML = (smallPhoto === null || smallPhoto === "") ? "":<img className="card-img-top" src={props.restaurant.photo.images.small.url} alt={props.restaurant.name} />

  const addr2 = (props.restaurant.address_obj.street2 !==null && props.restaurant.address_obj.street2 !== "") ? (<p> {props.restaurant.address_obj.street2} </p>):null

  const handleDelete = () => {
    setIsLoading(true);
    
    if (props.restaurant.ratings.length !== 0 ) {
      props.restaurant.ratings.map(ratingEntry => {
        return APIManager.deleteRating(ratingEntry.id)
        .then(()=> {
          APIManager.deleteObject(props.restaurant.id,"collection").then(() =>
          props.history.push("/collection")
          );    
        })
      })
      
        
    } else {
      
        APIManager.deleteObject(props.restaurant.id,"collection").then(() =>
          props.history.push("/collection")
        );
    }
  };

  
  return (
      (!isLoading) ?
    <div className="card">
        
             <picture>
              {pictureHTML}
            </picture>
        
      <div className="card-body">
        
      </div>   
          <div className="card-title">
            <h3 className="header__card__name">
              <span className="card-restaurantName">{props.restaurant.name}</span>
            </h3>
          </div>

          <div className="card-text">
              <address>
                <p>{props.restaurant.address_obj.street1}</p>
                {addr2}
                <p>{props.restaurant.address_obj.city}, {props.restaurant.address_obj.state}  {props.restaurant.address_obj.postalcode}</p>
              </address>
              <p>Phone:  {props.restaurant.phone}</p>
              <p>Delivery: {Helper.returnYesNo(props.restaurant.delivery)}</p>
              <p>Drive-Thru: {Helper.returnYesNo(props.restaurant.drivethru)}</p>
              <p>Outdoor Dining: {Helper.returnYesNo(props.restaurant.outdoor)}</p>
              <p>Take Out: {Helper.returnYesNo(props.restaurant.takeout)}</p>
          

            <Link to={`/collection/${props.restaurant.id}/details`}>
              <button><DetailsIcon title="Details" /></button>
            </Link>
            <button type="button" key={`DeleteRestaurant${props.restaurant.id}`} disabled={isLoading} title="Delete from Collection" onClick={handleDelete}><CollectionDeleteItem className="buttonCollectionDelete" /> </button>
          </div>
           
         
    </div>
    : null
  );
};

export default withRouter(CollectedRestaurantCard);
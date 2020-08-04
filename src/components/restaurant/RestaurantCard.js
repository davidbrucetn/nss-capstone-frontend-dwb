import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrFavorite as CollectionSaveitem } from "react-icons/gr"
import { MdFavorite as CollectionDeleteItem } from "react-icons/md"
import { GoInfo as DetailsIcon } from "react-icons/go"
import APIManager from "../../modules/APIManager"
import Helper from "../../modules/Helper"
import 'bootstrap/dist/css/bootstrap.min.css'; 


const RestaurantCard = (props) => {
    const [ isLoading, setIsLoading ] = useState(false)
    let diningBooleanKey = "";
    
    const activeUserId = Helper.getActiveUserId();
    let smallPhoto = props.restaurant.photo.images.small.url;
    const pictureHTML = (smallPhoto === null || smallPhoto === "") ? "":<img className="card-img-top" src={props.restaurant.photo.images.small.url} alt={props.restaurant.name} />
    const addr2 = (props.restaurant.address_obj.street2 !==null && props.restaurant.address_obj.street2 !== "") ? (<p> {props.restaurant.address_obj.street2} </p>):null
    diningBooleanKey = Helper.collectionDiningOptionBoolean(props.diningType.code)
    

    const handleRestaurantDelete = () => {
      setIsLoading(true);
      
      if (props.collection[0].ratings.length !== 0 ) {
        props.collection[0].ratings.map(ratingEntry => {
          return APIManager.deleteRating(ratingEntry.id)
          .then(()=> {
            APIManager.deleteObject(props.collection[0].id,"collection").then(() =>
            props.history.push(`${props.match.url}`)
            );    
          })
        })
        
          
      } else {
        
          APIManager.deleteObject(props.collection[0].id,"collection").then(() =>
            props.history.push(`${props.match.url}`)
          );
      }
    };
    
    const handleRestaurantSave = () => {
      
      setIsLoading(true);
      let newRestaurantObj = props.restaurant;
      newRestaurantObj.drivethru = false;
      newRestaurantObj.outdoor = false;
      newRestaurantObj.takeout = false;
      newRestaurantObj.delivery = false;
      newRestaurantObj = props.restaurant;
      newRestaurantObj.userId = activeUserId;
      newRestaurantObj.ppe = false;
      newRestaurantObj[diningBooleanKey] = true;
      
      APIManager.postObject(newRestaurantObj,"collection").then(() =>
        props.history.push(`${props.match.url}`)
      );
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
            { (props.collection[0] !== undefined) && 
             <>
              <p>Delivery: {Helper.returnYesNo(props.restaurant.delivery)}</p>
              <p>Drive-Thru: {Helper.returnYesNo(props.restaurant.drivethru)}</p>
              <p>Outdoor Dining: {Helper.returnYesNo(props.restaurant.outdoor)}</p>
              <p>Take Out: {Helper.returnYesNo(props.restaurant.takeout)}</p>
              </>
            }
            <hr/>
            <Link to={`/${( props.collection[0] === undefined) ? `restaurant/${props.match.params.state}/${props.match.params.city}/${props.restaurant.location_id}`:`collection/${props.match.params.state}/${props.match.params.city}/${props.collection[0].id}`}/details`}>
              <button><DetailsIcon title="Details" /></button>
            </Link>
            {( props.collection[0] === undefined) ? <button title="Save to Colletion" type="button"key={`SaveToCollection${props.restaurant.location_id}`}  disabled={isLoading} onClick={handleRestaurantSave}><CollectionSaveitem className="buttonCollectionSave" /> </button> : <button type="button" key={`DeleteRestaurant${props.collection[0].id}`} disabled={isLoading} title="Delete from Collection" onClick={handleRestaurantDelete}><CollectionDeleteItem className="buttonCollectionDelete" /> </button>
            }
      </div>
      
    </div> :null
  );
};

export default RestaurantCard;
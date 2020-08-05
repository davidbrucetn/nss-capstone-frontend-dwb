import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrFavorite as CollectionSaveitem } from "react-icons/gr"
import { MdFavorite as CollectionDeleteItem } from "react-icons/md"
import { GoInfo as DetailsIcon } from "react-icons/go"
import APIManager from "../../modules/APIManager"
import Helper from "../../modules/Helper"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../../App.css"


const RestaurantCard = (props) => {
    const [ isLoading, setIsLoading ] = useState(false)
    let diningBooleanKey = "";
    let pictureHTML = "";

     //set correct path based on props
    let thisPath = "";
    if (props.match.params.state === undefined ) { thisPath = `/restaurant`
    } else { 
      thisPath = `/restaurant/${props.match.params.state}/${props.match.params.city}` 
    }
    
    const activeUserId = Helper.getActiveUserId();
    if (props.restaurant.photo !== undefined ) {
      let smallPhoto = props.restaurant.photo.images.small.url;
      pictureHTML = (smallPhoto === null || smallPhoto === "") ? "":<img className="card-img-top" src={props.restaurant.photo.images.small.url} alt={props.restaurant.name} />
    } 
    
    const addr2 = (props.restaurant.address_obj.street2 !==null && props.restaurant.address_obj.street2 !== "") ? (<p> {props.restaurant.address_obj.street2} </p>):null
    diningBooleanKey = Helper.collectionDiningOptionBoolean(props.diningType.code)
    

    const handleRestaurantDelete = () => {
      setIsLoading(true);
      
      if (props.collection[0].ratings.length !== 0 ) {
        props.collection[0].ratings.map(ratingEntry => {
          return APIManager.deleteRating(ratingEntry.id)
          .then(()=> {
            APIManager.deleteObject(props.collection[0].id,"collection").then(() =>
            props.history.push(thisPath)
            );    
          })
        })
        
          
      } else {
        
          APIManager.deleteObject(props.collection[0].id,"collection").then(() =>
            props.history.push(thisPath)
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
        props.history.push("/collection")
      );
    };

 
    
  
  
  return (
    (!isLoading) ?
    <div className="card card-custom" >
        
        
        <picture >
          <div className="card__image">
                {pictureHTML}
          </div>
        </picture>
        
      
     <div className="card-body">
        
          
            <h4 className="card-title">
              <span className="card-restaurantName"><a href={props.restaurant.web_url} target="_blank" rel="noopener noreferrer">{props.restaurant.name}</a></span>
            </h4>
          
          
          <div className="card-text">
            <address>
              <p>{props.restaurant.address_obj.street1}</p>
              {addr2}
              <p>{props.restaurant.address_obj.city}, {props.restaurant.address_obj.state}  {props.restaurant.address_obj.postalcode}</p>
            </address>
            <p>Phone:  {props.restaurant.phone}</p>
            {(props.collection[0] !== undefined) && 
              <article className="article__diningOptions"  >
                <p><strong>Delivery: </strong>{Helper.returnYesNo(props.collection[0].delivery)}</p>
                <p><strong>Drive-Thru: </strong>{Helper.returnYesNo(props.collection[0].drivethru)}</p>
                <p><strong>Outdoor Dining: </strong>{Helper.returnYesNo(props.collection[0].outdoor)}</p>
                <p><strong>Take Out: </strong>{Helper.returnYesNo(props.collection[0].takeout)}</p>
              </article>
            }
          </div> 

            {( props.collection[0] === undefined) ?
            <>
            <Link to={`${thisPath}/${props.restaurant.location_id}/details`}><button><DetailsIcon></DetailsIcon></button></Link> 
            <button title="Save to Collection" type="button"key={`SaveToCollection${props.restaurant.location_id}`}  disabled={isLoading} onClick={handleRestaurantSave}><CollectionSaveitem className="buttonCollectionSave" /> </button> </> :
            <> 
            <Link to={`/collection/${props.collection[0].id}/details`}><button><DetailsIcon></DetailsIcon></button></Link>
            <button type="button" key={`DeleteRestaurant${props.collection[0].id}`} disabled={isLoading} title="Delete from Collection" onClick={handleRestaurantDelete}><CollectionDeleteItem className="buttonCollectionDelete" /> </button> </>
            }
      </div>
      
    </div> :null
  );
};

export default RestaurantCard;
import  React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import APIManager from "../../modules/APIManager"
import "../../App.css"
import { MdFavorite as CollectionDeleteItem } from "react-icons/md"
import { GoInfo as DetailsIcon } from "react-icons/go"
import Helper from "../../modules/Helper";

const CollectedRestaurantCard = (props) => {
  const [ isLoading, setIsLoading ] = useState(false);

  let smallPhoto = "";
  let pictureHTML = "";
 
  //set correct path based on props
  let thisPath = "";
  if (props.match.params.state === undefined ) { thisPath = `/collection`
  } else { 
      thisPath = `/collection}` 
  }

  if (props.restaurant.photo !== undefined ) {
    smallPhoto= props.restaurant.photo.images.small.url
    pictureHTML = (smallPhoto === null || smallPhoto === "") ? "":
    
    <img className="card-img-top" src={props.restaurant.photo.images.small.url} alt={props.restaurant.name} />
  }

  const addr2 = (props.restaurant.address_obj.street2 !==null && props.restaurant.address_obj.street2 !== "") ? (<p> {props.restaurant.address_obj.street2} </p>):null

  const handleDelete = () => {
    setIsLoading(true);
    
    if (props.restaurant.ratings.length !== 0 ) {
      props.restaurant.ratings.map(ratingEntry => {
        return APIManager.deleteRating(ratingEntry.id)
        .then(()=> {
          APIManager.deleteObject(props.restaurant.id,"collection").then(() => {
          props.history.push(thisPath)
          });    
        })
      })
    } else {
        APIManager.deleteObject(props.restaurant.id,"collection").then(() =>
          props.history.push(thisPath)
        );
    }
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
              <article className="article__diningOptions"  >
                <p><strong>Delivery: </strong>{Helper.returnYesNo(props.restaurant.delivery)}</p>
                <p><strong>Drive-Thru: </strong>{Helper.returnYesNo(props.restaurant.drivethru)}</p>
                <p><strong>Outdoor Dining: </strong>{Helper.returnYesNo(props.restaurant.outdoor)}</p>
                <p><strong>Take Out: </strong>{Helper.returnYesNo(props.restaurant.takeout)}</p>
              </article>
          
            </div> 

            <Link to={`${thisPath}/${props.restaurant.id}/details`}>
              <button><DetailsIcon title="Details" /></button>
            </Link>
            <button type="button" key={`DeleteRestaurant${props.restaurant.id}`} disabled={isLoading} title="Delete from Collection" onClick={handleDelete}><CollectionDeleteItem className="buttonCollectionDelete" /> </button>
        </div>
           
         
    </div>
    : null
  );
};

export default withRouter(CollectedRestaurantCard);
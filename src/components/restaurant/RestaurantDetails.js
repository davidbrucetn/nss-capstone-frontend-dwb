import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import APIManager from '../../modules/APIManager'
import './RestaurantDetail.css'
import Helper from "../../modules/Helper";


const RestaurantDetail = props => {
  const [restaurant, setRestaurant] = useState({ name: "", location_id: "" });
  const [ mediumPhoto, setMediumPhoto ] = useState("")
  const [ addr2, setAddr2 ] = useState("")
  const [ cuisine, setCuisine ]  = useState("")
  const [ operatingHours, setOperatingHours ] = useState([])
  const [ objResidence, setObjResidence ] = useState("")
  const [ ratings, setRatings ] = useState({ rating: "", notes: "", collectionId: ""})
  const [isLoading, setIsLoading] = useState(true);
  const [ ratingsArray, setRatingsArray ] = useState([])
  

  const buttonArray = [];
  const activeUserId = Helper.getActiveUserId();
  
  
  // Save Restaurant to User Collection
  const handleSave = () => {
    let newRestaurantObj = {}
    newRestaurantObj = restaurant;
    newRestaurantObj.userId = activeUserId;
    setIsLoading(true);
    APIManager.postObject(newRestaurantObj,"collection").then(() =>
      props.history.push("/restaurant")
    );
  };

  const handleEdit = (restaurantId) => {
    APIManager.update(restaurantId,"restaurants")
    .then(() => {
      props.history.push("/collection")
    })
  }

  // Delete Retaurant from User Collection
  const handleDelete = () => {
    setIsLoading(true);
    APIManager.deleteObject(restaurant.id,"collection").then(() =>
      props.history.push("/collection")
    );
  };

  const handleFieldChange = evt => {
    // stateToChange is previous keys/values in employee with spread (...)
    const stateToChange = { ...ratings };

    //key and value of new employee object, using helper to capitalize first letter if not experience
    stateToChange[evt.target.id] = (evt.target.value);
    setRatings(stateToChange)
}; // End handleFieldChange

const saveNotesRating = evt => {
  evt.preventDefault();
  if (ratings.notes === "" &&  ratings.rating === "") {
      window.alert("Please make a note or set a rating");
  } else {
      setIsLoading(true);
      ratings.collectionId = restaurant.id
      //create emp and redirect to list
      APIManager.postObject(ratings,"ratings")
      .then(() => props.history.push("/collection"))
  }
}; 

  const generateDetail = (restaurant,objResidence) => {
      setRestaurant(restaurant)
      setMediumPhoto((restaurant.photo.images.medium.url === null || restaurant.photo.images.medium.url === "") ? "":<img src={restaurant.photo.images.medium.url} alt={restaurant.name} />);
      (restaurant.cuisine[0].name !== undefined || restaurant.cuisine[0].name !== "" ) && setCuisine(<p><strong>Cuisine</strong> {restaurant.cuisine[0].name} </p>)
      let tempOpHours = [];
      // hours Math.floor(minutes / 60); minutes = minutes % 60;
      for (var d = 0; d < restaurant.hours.week_ranges.length; d++ ) {
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      const dayProper = weekday[d]
      tempOpHours.push(<p key={dayProper}>{dayProper}</p>)
      
        restaurant.hours.week_ranges[d].forEach(timeSegment => {
          if (timeSegment.open_time !== undefined && timeSegment.close_time !== undefined ) {
           
            const openTime = Helper.returnHours(timeSegment.open_time)
            const closeTime = Helper.returnHours(timeSegment.close_time)
            let elementKey=dayProper + openTime
            tempOpHours.push(<p key={elementKey}> {openTime} - {closeTime} </p>)
          };
        }); //end week ranges
      } // end operating hours
     
            let tempRatingsArray = [];
            restaurant.ratings.forEach(ratingEntry => {
              tempRatingsArray.push(<li>Rating: {ratingEntry.rating}</li>)
              tempRatingsArray.push(<li>Notes:  {ratingEntry.notes}</li>)
            })
            
            setRatingsArray(tempRatingsArray)
        
      setOperatingHours(tempOpHours)       
      setAddr2((restaurant.address_obj.street2 !==null && restaurant.address_obj.street2 !== "") ? (<p> {restaurant.address_obj.street2} </p>):null)
      setIsLoading(false)  
  }

  const buildButtonArray = () => {
    if (restaurant.userId === activeUserId ) {
      buttonArray.push(<button type="button" key={`SaveChangesRestaurant${restaurant.id}`} disabled={isLoading} onClick={handleEdit}>Save Changes</button>)
      buttonArray.push(<button type="button" key={`DeleteRestaurant${restaurant.id}`} disabled={isLoading} onClick={handleDelete}>Delete</button>)
    } else {
      buttonArray.push(<button type="button"key={`SaveToCollection${restaurant.location_id}`}  disabled={isLoading} onClick={handleSave}>Save to Collection</button>)
    }
    return buttonArray
  }

  const formFieldReturn = () => {
    if (objResidence === "LOCAL") {
      return  (
       <>
        <form>
        <fieldset>
            <div className="formgrid">
            <label htmlFor="rating">Rating: {ratings.rating} </label>
                <input
                    type="range"
                    onChange={handleFieldChange}
                    id="rating"
                    min="0"
                    max="5"
                    step=".5"
                    placeholder="Your Rating"
                />
                <label htmlFor="notes">Your Notes</label>
                <textarea
                    onChange={handleFieldChange}
                    id="notes"
                    placeholder="Your Notes"
                />
                
              </div>
            <div className="alignRight">
                <button
                type="button"
                disabled={isLoading}
                onClick={saveNotesRating}
                >Submit</button>
            </div>
        </fieldset>
    </form>
    </>
     )
  }}
 

  useEffect(() => {
    const APICall = (locationId) => {
    if (props.location.pathname.includes("/restaurant")) {
      APIManager.getTripAdvisorDetails(locationId)
      .then(response => {
         setObjResidence("API")
         generateDetail(response,objResidence)
      })
    } else {

      APIManager.getCollectionObject(locationId,activeUserId)
      .then(response => {
        setObjResidence("LOCAL")
        generateDetail(response,objResidence)
      })
    }
  }
    APICall(props.locationId)

},[props.locationId,props.location.pathname])

  return (
    (!isLoading) ? 
    <div className="container__details">
      
      <div className="container__details__image">
          <picture>
            {mediumPhoto}
          </picture>
      </div>
      
      <div className="container__details__content">  
        <h3>Name: <span style={{ color: 'darkslategrey' }}><a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></span></h3>
        
        <div className="container__details__content__location">
            <address>
              <p>{restaurant.address_obj.street1}</p>
              {addr2}
              <p>{restaurant.address_obj.city}, {restaurant.address_obj.state}  {restaurant.address_obj.postalcode}</p>
            </address>
            <p>Phone:  {restaurant.phone}</p>
        </div>

        <div className="container__details____ratings">
          <p><strong>Rating</strong> {restaurant.rating}</p>
          <p><strong>Ranking</strong> {restaurant.ranking}</p>
          {cuisine}
          <p><strong>Open Now: </strong>{restaurant.open_now_text}</p>
          {ratingsArray.map(ratingEntry => ratingEntry)}
        </div>

        <div className="container__details__content__hours">
          <h4>Operating Hours: </h4> 
          {operatingHours.map(timeSlot => { return timeSlot})}
        </div>
        {formFieldReturn()}
        
  
      </div>
      <div className="container__details__buttons">
        {buildButtonArray()}
      </div>

    </div>
    :null
  );
}

export default withRouter(RestaurantDetail);
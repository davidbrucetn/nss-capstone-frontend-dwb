import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import APIManager from '../../modules/APIManager';
import './RestaurantDetail.css';
import Helper from "../../modules/Helper";
import { AiOutlineEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";




const RestaurantDetail = (props) => {
  const [restaurant, setRestaurant] = useState({ name: "", location_id: "" });
  const [ mediumPhoto, setMediumPhoto ] = useState("")
  const [ addr2, setAddr2 ] = useState("")
  const [ cuisine, setCuisine ]  = useState("")
  const [ operatingHours, setOperatingHours ] = useState([])
  const [ objResidence, setObjResidence ] = useState("")
  const [ ratings, setRatings ] = useState({ rating: "", notes: "", collectionId: restaurant.id})
  const [isLoading, setIsLoading] = useState(true);

  const ratingsArray = [];  
  const buttonArray = [];
  const activeUserId = Helper.getActiveUserId();

  const history = useHistory();
  
  // Save Restaurant to User Collection
  const handleRestaurantSave = () => {
    let newRestaurantObj = {}
    newRestaurantObj = restaurant;
    newRestaurantObj.userId = activeUserId;
    setIsLoading(true);
    APIManager.postObject(newRestaurantObj,"collection").then(() =>
      props.history.push("/restaurant")
    );
  };

  const handleEdit = (restaurantId) => {
    APIManager.update(restaurant,"restaurants")
    .then(() => {
      props.history.push("/collection")
    })
  }

  // Delete Restaurant from User Collection
  const handleRestaurantDelete = () => {
    setIsLoading(true);
    if (Helper.testForArray(restaurant.ratings)) {
      restaurant.ratings.map(ratingEntry => {
        return APIManager.deleteRating(ratingEntry.id)
        .then(()=> {
          APIManager.deleteObject(restaurant.id,"collection").then(() =>
          props.history.push("/collection")
          );    
        })
      })
      
        
    } else {
        APIManager.deleteObject(restaurant.id,"collection").then(() =>
          props.history.push("/collection")
        );
    }
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
      if (ratings.id !== undefined) {
        APIManager.update(ratings,"ratings")
        .then(() => props.history.push(`/collection`))
      } else {
        ratings.collectionId = restaurant.id
        ratings.date = new Date()
        //create emp and redirect to list
        APIManager.postObject(ratings,"ratings")
        .then(() => props.history.push(`/collection`))
        }
      }
      
}; 

// Delete Rating Entry
const handleRatingDelete = (ratingId) => {
  setIsLoading(true);
      APIManager.deleteRating(ratingId)
      .then(() => props.history.push(`/collection`))
 
};

//Edit Rating Entry
const handleRatingEdit = (editRatingObj) => {
  document.getElementById("rating").value=editRatingObj.rating
  document.getElementById("notes").value=editRatingObj.notes
  document.getElementById("id").value=editRatingObj.id
  setRatings(editRatingObj)
  const ratingsButton = document.getElementById("ratingsButton")
  ratingsButton.textContent = "Save Edits"
  // ratingsButton.onclick=(() => saveRatingEdits(editRatingObj))

};

const handleRatingCancel = (evt) => {
  evt.preventDefault();
  
  setIsLoading(true)
  
  // history.push(`/collection/${restaurant.id}/details`)
  history.push(`/collection`)

 
}



  const generateDetail = (restaurant,typePull) => {
      
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
     
      setOperatingHours(tempOpHours)       
      setAddr2((restaurant.address_obj.street2 !==null && restaurant.address_obj.street2 !== "") ? (<p> {restaurant.address_obj.street2} </p>):null)
      
  }

  const buildRatingsArray = () => {
    if (Helper.testForArray(restaurant.ratings)) {
      if (restaurant.userId === activeUserId && Helper.testForArray(restaurant.ratings)) {

          restaurant.ratings.forEach((ratingEntry) => {
          ratingsArray.push(
            <div key={ratingEntry.id.toString() + ratingEntry.date} className="container__ratings__master">
              <div className="container__ratings__content">
                <li ><strong>Date: {Helper.dateConverter(ratingEntry.date)}</strong></li>
                <div>Rating: {ratingEntry.rating}</div>
                <div>Notes: {ratingEntry.notes}</div>
              </div>
              <div className="container__ratings__buttons">
                  <button type="button" key={`DeleteRating${ratingEntry.id}`} disabled={isLoading} onClick={() => handleRatingDelete(ratingEntry.id)}><TiDeleteOutline /></button>
                  <button type="button" key={`EditRating${ratingEntry.id}`} disabled={isLoading} onClick={() => handleRatingEdit(ratingEntry)}><AiOutlineEdit /></button>
              </div>
            </div>)
        })
      } 
    }
    return ratingsArray
  }



  const buildButtonArray = () => {
    if (restaurant.userId === activeUserId ) {
      buttonArray.push(<button type="button" key={`SaveChangesRestaurant${restaurant.id}`} disabled={isLoading} onClick={() => handleEdit(restaurant,"restaurants")}>Save Changes</button>)
      buttonArray.push(<button type="button" key={`DeleteRestaurant${restaurant.id}`} disabled={isLoading} onClick={handleRestaurantDelete}>Delete</button>)
    } else {
      buttonArray.push(<button type="button"key={`SaveToCollection${restaurant.location_id}`}  disabled={isLoading} onClick={handleRestaurantSave}>Save to Collection</button>)
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
            <label id="labelRating" htmlFor="rating">Your Rating: {ratings.rating} </label>
            <input
                    onChange={handleFieldChange}
                    id="id"
                    placeholder="ratingId"
                    className="hidden"
                />
                <input
                    type="range"
                    onChange={handleFieldChange}
                    id="rating"
                    min="0"
                    max="5"
                    step=".5"
                    defaultValue = "0"
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
                id="cancelButton"
                type="button"
                disabled={isLoading}
                onClick={handleRatingCancel}
                >Cancel</button>

            <button
                id="ratingsButton"
                type="button"
                disabled={isLoading}
                onClick={saveNotesRating}
                >Save New Rating</button>
            </div>
        </fieldset>
    </form>
    </>
     )
  }}
 

  useEffect(() => {
    const activeUserId = Helper.getActiveUserId()
    
        const APICall = (locationId) => {
    if (props.location.pathname.includes("/restaurant")) {
      APIManager.getTripAdvisorDetails(locationId)
      .then(response => {
         setObjResidence("API")
         generateDetail(response,"API")
      })
    } else {

      APIManager.getCollectionObject(locationId,activeUserId)
      .then(response => {
        setObjResidence("LOCAL")
        generateDetail(response,"LOCAL")
      })
      .then(()=> setIsLoading(false)  )
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
              

        <div key={"container__details__ratings" + restaurant.location_id } className="container__details__ratings">
          <p><strong>Rating</strong> {restaurant.rating}</p>
          <p><strong>Ranking</strong> {restaurant.ranking}</p>
          {cuisine}
          <p><strong>Open Now: </strong>{restaurant.open_now_text}</p>
          <div className="container__user__ratings">
            <div className="container__ratings__array">
              {buildRatingsArray()}
            </div>
            <div className="container__ratings__form">
              {formFieldReturn()}
            </div>
          </div>
          
        </div>

        <div key={"container__details__content__hours" + restaurant.location_id } className="container__details__content__hours">
          <h4 >Operating Hours: </h4> 
          {operatingHours.map(timeSlot => { return timeSlot})}
        </div>
        
        
  
      </div>
      <div key={"container__details__buttons"} className="container__details__buttons">
        {buildButtonArray()}
      </div>

    </div>
    :null
  );
}

export default withRouter(RestaurantDetail);
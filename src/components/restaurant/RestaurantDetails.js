import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { ReactTinyLink } from "react-tiny-link"
import APIManager from '../../modules/APIManager';
import './RestaurantDetail.css';
import Helper from "../../modules/Helper";
import { BsFillXDiamondFill } from "react-icons/bs"
import { AiOutlineEdit as EditButton, AiOutlineSave } from "react-icons/ai";
import { TiDeleteOutline as DeleteRatingButton} from "react-icons/ti";
import { MdFavorite as CollectionDeleteItem } from "react-icons/md"
import { GrFavorite as CollectionSaveitem } from "react-icons/gr"
import { Checkbox as RestaurantCheckbox } from '@material-ui/core';




const RestaurantDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({ name: "", location_id: "" });
  const [ editEnabled, setEditEnabled ] = useState(false)
  const [ ppeChecked, setPPEChecked ] = useState(false);
  const [ deliveryChecked, setDeliveryChecked ] = useState(false)
  const [ drivethruChecked, setDrivethruChecked ] = useState(false)
  const [ outdoorChecked, setOutdoorChecked ] = useState(false)
  const [ takeoutChecked, setTakeoutChecked ] = useState(false)
  const [ mediumPhoto, setMediumPhoto ] = useState("")
  const [ addr2, setAddr2 ] = useState("")
  const [ cuisine, setCuisine ]  = useState("")
  const [ operatingHours, setOperatingHours ] = useState([])
  const [ objResidence, setObjResidence ] = useState("")
  const [ ratings, setRatings ] = useState({ rating: "", notes: "", collectionId: restaurant.id})
  

  const ratingsArray = [];  
  const buttonArray = [];
  const activeUserId = Helper.getActiveUserId();

  const history = useHistory();

  
  
const handlePPEChange = (evt) => {
  
  setPPEChecked(evt.target.checked)
  document.getElementById("SaveThisEdit").classList.toggle("blueButton")
  restaurant.ppe = evt.target.checked
  setRestaurant(restaurant)
}

const handleOptionChange = (evt) => {
  if (evt.target.id === "drivethru") setDrivethruChecked(evt.target.checked)
  if (evt.target.id === "delivery")  setDeliveryChecked(evt.target.checked)
  if (evt.target.id === "takeout") setTakeoutChecked(evt.target.checked)
  if (evt.target.id === "outdoor") setOutdoorChecked(evt.target.checked)
  
  document.getElementById("SaveThisEdit").classList.toggle("blueButton")
  restaurant[evt.target.id] = evt.target.checked
  setRestaurant(restaurant)

}

  // Save Restaurant to User Collection
  const handleRestaurantSave = () => {
    let newRestaurantObj = {}
    newRestaurantObj = restaurant;
    newRestaurantObj.userId = activeUserId;
    setIsLoading(true);
    
    APIManager.postObject(newRestaurantObj,"collection")
    .then(() => {
     
        props.history.push(`/collection`)
      });
  };

  const handleEdit = () => {
    setIsLoading(true)
    APIManager.update(restaurant,"collection")
    .then(() => {
      props.history.push(`/collection/${restaurant.id}/details`)
    })
  }

  // Delete Restaurant from User Collection
  const handleRestaurantDelete = () => {
    setIsLoading(true);
    
    if (restaurant.ratings.length !== 0 ) {
      restaurant.ratings.map(ratingEntry => {
        return APIManager.deleteRating(ratingEntry.id)
        .then(()=> {
          APIManager.deleteObject(restaurant.id,"collection").then(() =>
          props.history.push(`/collection`)
          );    
        })
      })
      
        
    } else {
      
        APIManager.deleteObject(restaurant.id,"collection").then(() =>
          props.history.push(`/collection`)
        );
    }
  };

  const handleFieldChange = evt => {
    // stateToChange is previous keys/values in employee with spread (...)
    const stateToChange = { ...ratings };
    //key and value of new employee object, using helper to capitalize first letter if not experience
    stateToChange[evt.target.id] = (evt.target.value);
    
    if (evt.target.id === "notes" || evt.target.id ==="rating" ) {setRatings(stateToChange)}
}; // End handleFieldChange

const saveNotesRating = evt => {
  evt.preventDefault();
  if (ratings.notes === "" &&  ratings.rating === "") {
      window.alert("Please make a note or set a rating");
  } else {
      setIsLoading(true);
      if (ratings.id !== undefined) {
        APIManager.update(ratings,"ratings")
        .then(() => props.history.push(`/collection/${restaurant.id}/details`))
      } else {
        ratings.collectionId = restaurant.id
        ratings.date = new Date()
        //create emp and redirect to list
        APIManager.postObject(ratings,"ratings")
        .then(() => props.history.push(`/collection/${restaurant.id}/details`))
        }
      }
      
}; 

// Delete Rating Entry
const handleRatingDelete = (ratingId) => {
  setIsLoading(true);
      APIManager.deleteRating(ratingId)
      .then(() => props.history.push(`/collection/${restaurant.id}/details`))
 
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
  
  history.push(`/collection/${restaurant.id}/details`)
  // history.push(`/collection`)

}

  const generateDetail = (restaurant,typePull) => {
      
      setEditEnabled(false)
      setRestaurant(restaurant)
      if (restaurant.photo !== undefined ) {
        setMediumPhoto((restaurant.photo.images.medium.url === null || restaurant.photo.images.medium.url === "") ? "":<img src={restaurant.photo.images.medium.url} alt={restaurant.name} />);
      }
      if (typePull === "LOCAL" ) { 
        setPPEChecked(restaurant.ppe)
        setDeliveryChecked(restaurant.delivery)
        setDrivethruChecked(restaurant.drivethru)
        setOutdoorChecked(restaurant.outdoor)
        setTakeoutChecked(restaurant.takeout)
            }

      (restaurant.cuisine.length !== 0  ) && setCuisine(<p><strong>Cuisine</strong> {restaurant.cuisine[0].name} </p>)
      if (restaurant.hours !== undefined ) {
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
        tempOpHours.push(<p key={dayProper}><strong>{dayProper}</strong></p>)
        
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

      }
      
     
      
      setAddr2((restaurant.address_obj.street2 !==null && restaurant.address_obj.street2 !== "") ? (<p> {restaurant.address_obj.street2} </p>):null)
      
  }

  
  const buildRatingsArray = () => {
    if (Helper.testForArray(restaurant.ratings)) {
      if (restaurant.userId === activeUserId && Helper.testForArray(restaurant.ratings)) {

          restaurant.ratings.forEach((ratingEntry) => {
          ratingsArray.push(
            <div key={ratingEntry.id.toString() + ratingEntry.date} className="container__ratings__master">
              <div className="container__ratings__content">
                <div className="container__ratings__header">
                  <li><strong>Date: {Helper.dateConverter(ratingEntry.date)}</strong></li>
                  <div className="container__ratings__buttons">
                    <button type="button" key={`DeleteRating${ratingEntry.id}`} title="Delete" disabled={isLoading} onClick={() => handleRatingDelete(ratingEntry.id)}><DeleteRatingButton /></button>
                    <button type="button" key={`EditRating${ratingEntry.id}`} title="Edit" disabled={isLoading} onClick={() => handleRatingEdit(ratingEntry)}><EditButton /></button>
                  </div>
                </div>
                <div>Rating: {ratingEntry.rating}</div>
                <div>Notes: {ratingEntry.notes}</div>
              </div>
              
            </div>)
        })
      } 
    }
    return ratingsArray
  }

  const updateRestaurant = () => {
    if (editEnabled === false) {
      setIsLoading(true)
      setEditEnabled(true)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      setEditEnabled(false)
      setIsLoading(false)
    }
    
  }


  const buildButtonArray = () => {
    if (restaurant.userId === activeUserId ) {
      buttonArray.push(<button type="button" className="button__edit__ppe" key={`EditRetaurant${restaurant.id}`} title="Edit" disabled={isLoading} onClick={updateRestaurant}><EditButton className="button__edit__ppe" /></button>)
      buttonArray.push(<button type="button" key={`SaveChangesRestaurant${restaurant.id}`} title="Save PPE Update" id="saveRestaurantEdits" disabled={isLoading} onClick={handleEdit}><AiOutlineSave id="SaveThisEdit"/> </button>)
      buttonArray.push(<button type="button" key={`DeleteRestaurant${restaurant.id}`} disabled={isLoading} title="Delete from Collection" onClick={handleRestaurantDelete}><CollectionDeleteItem className="buttonCollectionDelete" /> </button>)
    } else {
      buttonArray.push(<button type="button"key={`SaveToCollection${restaurant.location_id}`}  disabled={isLoading} onClick={handleRestaurantSave}><CollectionSaveitem className="buttonCollectionSave" /> </button>)
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
  } else { 
      return <>
      <aside className="aside__addMe">
          <div>
            <p> Click on the <CollectionSaveitem /> to add this restaurant to your collection and rate!</p>
          </div>
      </aside> </> }
}
 

  useEffect(() => {
    
    const activeUserId = Helper.getActiveUserId()
    
    const APICall = (locationId) => {

        if (props.location.pathname.includes("/restaurant")) {
          APIManager.getTripAdvisorDetails(locationId)
          .then(response => {
            setObjResidence("API")
            generateDetail(response,"API")
          })
          .then(()=> setIsLoading(false)  )
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

},[props.locationId,props.location.pathname,isLoading])

  return (
    (!isLoading) ? 
    <div className="container__details">
          <div className="container__image__layout">
              <div className="container__picture">
                <picture>
                  {mediumPhoto}
                </picture>
              </div>
            
              <div className="container__tinylink">
                
                  {/* <ReactTinyLink 
                  className="TinyLink_Element"
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={2}
                  url={restaurant.web_url} /> */}
              </div>
          </div>
      
      <div className="container__details__content">  
        <h3 className="restaurant__header"><span style={{ color: 'darkslategrey' }}><a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></span></h3>
        
        <div className="container__details__options">
          <div className="container__details__content__location">
              <address>
                <p>{restaurant.address_obj.street1}</p>
                {addr2}
                <p>{restaurant.address_obj.city}, {restaurant.address_obj.state}  {restaurant.address_obj.postalcode}</p>
              </address>
              <p>Phone:  {restaurant.phone}</p>
              <p><strong>Rating</strong> {restaurant.rating}</p>
          <p><strong>Ranking</strong> {restaurant.ranking}</p>
          {cuisine}
          <p><strong>Open Now: </strong>{restaurant.open_now_text}</p>
          
          { (restaurant.userId === activeUserId) && 
            <p><strong>Staff using masks/gloves/ppe? </strong> { (restaurant.ppe === false) ? "No  ":"Yes  "}
            
              { (editEnabled ) &&
                <RestaurantCheckbox id="ppe" name="ppe" onChange={handlePPEChange} color="primary" title="PPE?" value={ppeChecked} checked={ppeChecked} />
              }
            
              </p> 
          }
          </div>
          <div className="container__options">
              <p><strong>Delivery: </strong>{Helper.returnYesNo(restaurant.delivery)}  { (editEnabled ) &&
                <RestaurantCheckbox id="delivery" name="delivery" onChange={handleOptionChange} color="primary" title="Delivery?" value={deliveryChecked} checked={deliveryChecked} />
              }</p>
              <p><strong>Drive-Thru: </strong>{Helper.returnYesNo(restaurant.drivethru)}  { (editEnabled ) &&
                <RestaurantCheckbox id="drivethru" name="drivethru" onChange={handleOptionChange} color="primary" title="Drive-Thru?" value={drivethruChecked} checked={drivethruChecked} />
              }</p>
              <p><strong>Outdoor Dining: </strong>{Helper.returnYesNo(restaurant.outdoor)}  { (editEnabled ) &&
                <RestaurantCheckbox id="outdoor" name="outdoor" onChange={handleOptionChange} color="primary" title="Outdoor Dining?" value={outdoorChecked} checked={outdoorChecked} />
              }</p>
              <p><strong>Take Out: </strong>{Helper.returnYesNo(restaurant.takeout)}  { (editEnabled ) &&
                <RestaurantCheckbox id="takeout" name="takeout" onChange={handleOptionChange} color="primary" title="Take Out?" value={takeoutChecked} checked={takeoutChecked} />
              }</p>
              <div className="container__miscInfo">
              { (restaurant.neighborhood_info !== undefined ) && <p><strong>Price: </strong>{restaurant.price}</p>}
                { (restaurant.neighborhood_info !== undefined ) && <p><strong>Neighborhood: </strong>{restaurant.neighborhood_info[0].name}</p>}
              </div>
          </div>
        </div>
              

        <div key={"container__details__ratings" + restaurant.location_id } className="container__details__ratings">
        

          <div key={"container__details__buttons"} className="container__details__buttons">
            {buildButtonArray()}
         </div>

          <div className="container__user__ratings">
              <div className="container__ratings__array">
                {buildRatingsArray()}
              </div>
              
              <div className="container__ratings__form">
                {formFieldReturn()}
              </div>
          </div>
          
        </div>

        <div className="container__hours__other">

        
          <div key={"container__details__content__hours" + restaurant.location_id } className="container__details__content__hours">
            <h4 >Operating Hours </h4> 
            {operatingHours.map(timeSlot => { return timeSlot})}
          </div>

          <div key={restaurant.id + "Awards"}className="container__other">
              { (restaurant.awards.length > 0 ) && 
                 <>
                 <h4 >Awards </h4>
                {restaurant.awards.map((award,i) => 
                  { return <p key={award.display_name + i }><strong><BsFillXDiamondFill /></strong> {award.display_name}</p>
                  })}
                </>
              }
          </div>

        </div>
        
        
  
      </div>
      

    </div>
    :null
  );
}

export default withRouter(RestaurantDetail);
import { apiKeys, jsonDB } from "./Settings.js"
import Helper from "./Helper"

export default {
    
   postObject(newObjEntry, basetable) {
        return fetch(`${jsonDB}/${basetable}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObjEntry)})
            .then((response) => {
              return response.json();
                })
    },
    deleteObject(id, basetable) {
        return fetch(`${jsonDB}/${basetable}/${id}`, {
            method: "DELETE"})
            .then((response) => {
                return response.json();
                  })
    },
    deleteRating(ratingId) {
        return fetch(`${jsonDB}/ratings/${ratingId}`, {
            method: "DELETE"})
            .then((response) => {
                return response.json();
                  })
    },
    getCollectionByLocationId(userId,location_id) {
        return fetch(`${jsonDB}/collection?location_id=${location_id}&userId=${userId}&_embed=ratings&_expand=user`)
        .then(response => response.json())
    },
    getCollection(userId) {
        return fetch(`${jsonDB}/collection?userId=${userId}&_embed=ratings&_expand=user`)
        .then(response => response.json())
    },
    getCollectionDiningOptions(userId,filterCode) {
        let diningOption = "";
        if (filterCode !== "all") {
            diningOption = Helper.collectionDiningOptionBoolean(filterCode[0])
            diningOption = diningOption + "=true"
        } else { diningOption = "" }
        
        return fetch(`${jsonDB}/collection?userId=${userId}&${diningOption}&_embed=ratings&_expand=user`)
        .then(response => response.json())
    },
    getCollectionObject(collectionId,userId) {
        return fetch(`${jsonDB}/collection/${collectionId}?userId=${userId}&_embed=ratings&_expand=user`)
        .then(response => response.json())
    },
    getUserbyEmail(emailAddress) {
        return fetch(`${jsonDB}/users?email=${emailAddress}`)
        .then(response => response.json())
    },
    getAllUsers() {
        return fetch(`${jsonDB}/users`)
        .then((response) => {return response.json()})
        .catch(err => {
	        return "empty";
        });

    },
    getTripAdvisorLocationCode(cityStateObj) {
        return fetch(`https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=1&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${cityStateObj.city}%252C%20${cityStateObj.state}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": `${apiKeys.rapidapiTripAdvisor}`
            }
        })
        .then((response) => {return response.json()})
        .catch(err => {
	        return err;
        });
    },
    getTripAdvisorListByLocation(locationId,filterCode) {
        const diningOption = filterCode[0]
        return fetch(`https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&restaurant_dining_options=${diningOption}&location_id=${locationId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": `${apiKeys.rapidapiTripAdvisor}`
            }
        })
        .then((response) => {
            return response.json()
        })
        
          
    },
    getTripAdvisorDetails(locationId) {
       
        return fetch(`https://tripadvisor1.p.rapidapi.com/restaurants/get-details?location_id=${locationId}&lang=en_US&currency=USD`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": `${apiKeys.rapidapiTripAdvisor}`
            }
        })
        .then((response) => {return response.json()})
        
          
    },
    getDummyList() {
        return fetch(`${jsonDB}/dummy`)
                .then(response => response.json()) 
    },
    update(editedObject,basetable) {
        return fetch(`${jsonDB}/${basetable}/${editedObject.id}`, {
          method: "PUT",                    
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(editedObject)
        }).then(response => response.json())
      }
}



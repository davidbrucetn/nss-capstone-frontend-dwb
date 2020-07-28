import { apiKeys, jsonDB } from "./Settings.js"

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
    getUserbyEmail(emailAddress) {
        return fetch(`${jsonDB}/users?email=${emailAddress}`)
        .then(response => response.json())
    },
    getAllUsers() {
        return fetch(`${jsonDB}/users`)
                .then(response => response.json())
    },
    getTripAdvisorListByLocation(locationId,filterCodes) {
        let diningOptions = ""
        if ( filterCodes > 0 ) {
        filterCodes.forEach(filter => {
            if (filter.code.length() > 0 ) {
              diningOptions += `&restaurant_dining_options=${filter.code}`
            }
        }) } else { diningOptions = ""}

        return fetch(`https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=${locationId}${diningOptions}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": `${apiKeys.rapidapiTripAdvisor}`
            }
        })
        .then((response) => {return response.json()})
        
          
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
    }
}



import APIManager from "../modules/APIManager.js"

const indexBody = document.querySelector(".div__main__data")

const filters = [ { filter: "Outdoor Seating", code: 1603}, { filter: "Delivery", code: ""}]

const locations = [ {city: "Franklin", locationId: "5562736"},{city: "Nashville", locationId: "55229"} ]
const locationFind = locations.splice(locations.findIndex(location => location.city === "Nashville"), 1)

let filterCodes = filters;


console.log(locationFind[0].locationId)

const getTARestaurants = () => {
APIManager.getTripAdvisorListByLocation(locationFind[0].locationId,filterCodes)
    .then(response => {
        const restaurants = response.data;
        restaurants.forEach(restaurant => {
            if (restaurant.ad_position === undefined ) {
                console.log(restaurant)
                indexBody.innerHTML += `<h3>${restaurant.name}</h3>`
            }
        });
    })

}

getTARestaurants();

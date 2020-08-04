//Helper Functions 
//Author: David Bruce

const filters = [ { filter: "Drive-thru", code: "20992"},{ filter: "Outdoor Seating", code: "10603"}, { filter: "Delivery", code: "10600"}, {filter: "Takeout", code: "10601"}]


export default {
    returnYesNo(booleanObjectValue) {
        if (booleanObjectValue === true ) {
            return "Yes"
        } else {
            return "No"
        }
    },
    collectionDiningOptionBoolean(filterCode) {
        switch(filterCode) {
            case "20992":
              return "drivethru";
              break;
            case "10603":
              return "outdoor"
              break;
            case "10600":
              return "delivery"
              break;
            case "10601":
                return "takeout"
                break;
            default:
              break;
          }
    },
    diningOptionMatch(filterCode) {
        return filters.find( ( {code }) => code === filterCode )
    },
    dateConverter(suppliedDate) {
        let date = suppliedDate.toString()
        date = date.slice(0,10)
        date = date.split("-")
        return date = `${date[1]}-${date[2]}-${date[0]}`
    },
    getActiveUserId() {
        const activeUserId = sessionStorage.getItem("credentials") === null ? JSON.parse(localStorage.getItem("credentials")).id :JSON.parse(sessionStorage.getItem("credentials")).id
        return activeUserId
    },
    returnHours(timeMinutes) {
        let hourValue = Math.floor(timeMinutes /60)
        let minutesValue = ((timeMinutes % 60) < 10) ? (timeMinutes % 60).toString() + "0" : (timeMinutes % 60).toString();
        if ( hourValue >= 12) {
          hourValue = hourValue - 12
          minutesValue = minutesValue + " pm"
        } else {
         if (hourValue === 0) { hourValue = 12 }
          minutesValue = minutesValue + " am"
        }
        (hourValue > 12) && (hourValue= hourValue - 12)
        return (`${hourValue}:${minutesValue}`)
    },
    // Generate unique keys for static elements
    generateKey(pre) {
        const thisKey = `${ pre }_${ new Date().getTime() }`
        return thisKey;
    },
    testForArray(thisArray) {
        return (typeof thisArray !== "undefined" && thisArray !== null )
    }
    
}


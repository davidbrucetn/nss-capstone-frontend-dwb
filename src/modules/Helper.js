//Helper Functions 
//Author: David Bruce

export default {
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
    }
    
}


import React, { useState, useEffect } from "react";

//Children Components
import NavbarMenu from "./components/nav/Navbs"
import ApplicationViews from "./components/ApplicationViews"


import "./App.css"

const CovidDining = () => {
  // Check if credentials are in session storage with boolean return
 
 const isAuthenticated = () => ( (localStorage.getItem("credentials") !== null) || (sessionStorage.getItem("credentials") !== null))
  

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = (user,storageType) => {
    if (storageType === "session") {
      sessionStorage.setItem("credentials", JSON.stringify(user));
    } else {
      localStorage.setItem("credentials",JSON.stringify(user))
    }
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
    localStorage.clear();
    setHasUser(isAuthenticated());
  }

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated()]);

    return (
      <>
        <NavbarMenu  hasUser={hasUser} clearUser={clearUser} />
        
        <ApplicationViews hasUser={hasUser} setUser={setUser} clearUser={clearUser} />
      </>
    );
  };


export default CovidDining;
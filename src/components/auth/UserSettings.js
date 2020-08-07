import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager"
import Helper from "../../modules/Helper"
import "./UserSettings.css"




const UserSettings = (props) => {
    const [ credentials, setCredentials ] = useState({ email: "", password: "", id: "" });
    const [ alertmsg, setAlert ] = useState("");
    const [ activeUserObject, setActiveUserObject ] = useState({})
    const [ confirmLabel, setConfirmLabel ] = useState("Confirm Password")
    
    let passwordMatch = false;
    let newCredentials = {};

    

        // Update state whenever an input field is edited
        const handleFieldChange = (evt) => {
            const stateToChange = { ...credentials };
            stateToChange[evt.target.id] = evt.target.value;
            setConfirmLabel("Confirm Password")            
            setCredentials(stateToChange);
        };

        const checkMatch = (e) => {
            

            if (credentials.confirmPassword !== undefined && credentials.newPassword !== undefined ) {
                
                
                    if (credentials.confirmPassword !== credentials.newPassword ) {
                        setConfirmLabel("Passwords Do Not Match")
                    } else { passwordMatch = true }
                
            }
        }

        const handleUserUpdate = (e) => {
                    
                        if (activeUserObject.password === credentials.oldPassword) {
                                passwordMatch = true;
                            //let password remain the same if not changed
                            if (credentials.newPassword !== null || credentials.newPassword !== "" )
                            { activeUserObject.password = credentials.newPassword }
                            APIManager.update(activeUserObject,"users")
                                newCredentials.email = activeUserObject.email
                                newCredentials.password = activeUserObject.password
                                newCredentials.id = activeUserObject.id
                            if (sessionStorage.getItem("credentials") === null)  {
                                props.setUser(newCredentials,"local");
                            } else {
                                props.setUser(newCredentials,"session")
                            }; //end credential storage type if
                            props.history.push("/");
                        } //End password
       
                
                    

                
                if (passwordMatch === false) { setAlert("User password incorrect") }
            
        }; //end handleLogin

        const handleSubmitClick = (e) => {
            e.preventDefault();
            console.log(activeUserObject.password)
            if (activeUserObject.password === credentials.oldPassword) {
                console.log("Current Matched")
                if(credentials.newPassword === credentials.confirmPassword) {
                    handleUserUpdate()    
                } else {
                    props.showError('Passwords do not match');
                }
            } else {
                props.showError('Current Password is incorrect')
            }
            
        }

      

    
    useEffect(()=>{
        
    // Get Current User
    const userEmail=Helper.getActiveUserEmail();
    console.log(userEmail)
    APIManager.getUserbyEmail(userEmail)
    .then((userObjectArray) => {
        console.log(userObjectArray)
      setActiveUserObject(userObjectArray[0])
      
    })

        if (alertmsg !== null && alertmsg !== "") {
            props.showError(alertmsg) &&
            props.push.history("/usersettings")
        }
        
    },[props,alertmsg])

    

return (
    <div className="container-fluid">
        <div className="container__form__user">
            <form className="form__user" onSubmit={handleSubmitClick}>
                <fieldset className="fieldset__form__user">
                    <h3>Update User Password</h3>
                    <div className="formgrid__login">

                    <input onChange={handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        autoComplete="username"
                        className="hidden"
                        required="" autoFocus="" />
                            
                    
                    <input type="password"
                            className="form-control"
                            id="oldPassword"
                            placeholder="Current Password"
                            autoComplete="current-password"
                            required=""
                            onChange={handleFieldChange}  />
                        <label htmlFor="inputPassword">Current Password</label>

                        <input type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="New Password"
                            autoComplete="new-password"
                            required=""
                            onChange={handleFieldChange}  />
                        <label htmlFor="inputPassword">New Password</label>

                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            onChange={handleFieldChange}  
                            onBlur={checkMatch}
                            />
                        <label htmlFor="exampleInputPassword1">{confirmLabel}</label>
                        
                    </div>
                    <div className="container__form__user--buttons">
                        <button type="submit">Update</button>
                        <Link to={`/`}><button>Cancel</button></Link>
                    </div>
                </fieldset>
            </form>
            <div className="alert alert-success mt-2" style={{display: credentials.successMessage ? 'block' : 'none' }} role="alert">
                {credentials.successMessage}
            </div>
        </div>
    </div>
    );
};
export default withRouter(UserSettings);
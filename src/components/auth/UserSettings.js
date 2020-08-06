import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager"
import Helper from "../../modules/Helper"
import "./UserSettings.css"

const UserSettings = (props) => {
    const [ credentials, setCredentials ] = useState({ email: "", password: "", id: "" });
    const [ users, setUsers ] = useState([])
    const [ alertmsg, setAlert ] = useState("");
    const [ userObject, setUserObj ] = useState({});
    const [ activeUserObject, setActiveUserObject ] = useState({})
    let userMatch = false;
    let passwordMatch = false;

    // Get Current User
    const userEmail=Helper.getActiveUserEmail();
    APIManager.getUserbyEmail(userEmail)
    .then((userObjectArray) => {
      setActiveUserObject(userObjectArray[0].id)
    })


        // Update state whenever an input field is edited
        const handleFieldChange = (evt) => {
            const stateToChange = { ...credentials };
            stateToChange[evt.target.id] = evt.target.value;
            setCredentials(stateToChange);
        };

        const handleUserUpdate = (e) => {
                    
                e.preventDefault();
                users.forEach(user => {
                    if (user.email === credentials.email) {
                        userMatch = true;
                        if (user.password === credentials.password) {
                            passwordMatch = true;
                            credentials.id = user.id;
                            if (document.getElementById("localCreds").checked === true) {
                                props.setUser(credentials,"local");
                            } else {
                                props.setUser(credentials,"session")
                            }; //end credential storage type if
                            props.history.push("/");
                        } //End password
                    } //End user email
                }); //end user array
                    

                if (userMatch === false) { setAlert("User email not found") } 
                if (userMatch === true && passwordMatch === false) { setAlert("User password incorrect") }
            
        }; //end handleLogin

        const handleSubmitClick = (e) => {
            e.preventDefault();
            if (userObject.password === credentials.oldPassword) {
                if(credentials.password === credentials.confirmPassword) {
                    handleUserUpdate()    
                } else {
                    props.showError('Passwords do not match');
                }
            } else {
                props.showError('Current Password is incorrect')
            }
            
        }

    
    useEffect(()=>{
        APIManager.getAllUsers()
                .then(response => {
                    setUsers(response)
                })
        if (alertmsg !== null && alertmsg !== "") {
            props.showError(alertmsg)
        }
        
    },[props,alertmsg])

    

return (
    <div className="container__home">
        <div className="container__form__user">
            <form className="form__user" onSubmit={handleSubmitClick}>
                <fieldset className="fieldset__form__user">
                    <h3>Update User Password</h3>
                    <div className="formgrid__login">
                        
                    <input type="password"
                            className="form-control"
                            id="oldPassword"
                            placeholder="Current Password"
                            required=""
                            onChange={handleFieldChange}  />
                        <label htmlFor="inputPassword">New Password</label>

                        <input type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="New Password"
                            required=""
                            onChange={handleFieldChange}  />
                        <label htmlFor="inputPassword">New Password</label>

                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            onChange={handleFieldChange}  />
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        
                    </div>
                    <div className="container__form__user--buttons">
                        <button type="submit">Update</button>
                        <Link to={`/home`}><button>Cancel</button></Link>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
    );
};
export default withRouter(UserSettings);
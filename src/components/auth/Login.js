import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager"
import "./Login.css"

const Login = (props) => {
    const [ credentials, setCredentials ] = useState({ email: "", password: "", id: "" });
    const [ alertmsg, setAlert ] = useState("");
    const [ users, setUsers ] = useState([])
    let userMatch = false;
    let passwordMatch = false;

        // Update state whenever an input field is edited
        const handleFieldChange = (evt) => {
            const stateToChange = { ...credentials };
            stateToChange[evt.target.id] = evt.target.value;
            setCredentials(stateToChange);
        };

        const handleLogin = (e) => {
            
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
    <div className="container__login">
        <div className="container__form__login">
            <form className="form__login" onSubmit={handleLogin}>
                <fieldset className="fieldset__form__login">
                    <h3>Please sign in</h3>
                    <div className="formgrid__login">
                        <input onChange={handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        autoComplete="username"
                        required="" autoFocus="" />
                        <label htmlFor="inputEmail">Email address</label>

                        <input onChange={handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required="" />
                        <label htmlFor="inputPassword">Password</label>

                        
                    </div>
                    <div className="container__form__login--buttons">
                    Remember Me<input type="checkbox" value="localCreds" id="localCreds" onChange={handleFieldChange}/>
                        <button type="submit">Sign in</button>
                        <Link to={`/registration`}><button>New User</button></Link>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
    );
};
export default withRouter(Login);
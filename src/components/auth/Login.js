import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager"

const Login = (props) => {
    const [ credentials, setCredentials ] = useState({ email: "", password: "" });
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
        if (alertmsg !== null) {
            props.showError(alertmsg)
        }
        
    },[props,alertmsg])

    

return (
    <form onSubmit={handleLogin}>
        <fieldset>
            <h3>Please sign in</h3>
            <div className="formgrid">
            <input onChange={handleFieldChange} type="email"
            id="email"
            placeholder="Email address"
            required="" autoFocus="" />
          <label htmlFor="inputEmail">Email address</label>

          <input onChange={handleFieldChange} type="password"
            id="password"
            placeholder="Password"
            required="" />
          <label htmlFor="inputPassword">Password</label>

          <input type="checkbox" value="localCreds" id="localCreds" onChange={handleFieldChange}/>
          <label htmlFor="localCreds">Remember Me</label>
        </div>
        <button type="submit">Sign in</button>
        <Link to={`/registration`}>
              <button>Register New User</button>
            </Link>
        </fieldset>
    </form>
    );
};
export default withRouter(Login);
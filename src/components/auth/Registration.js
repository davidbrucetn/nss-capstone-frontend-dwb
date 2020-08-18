import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsonDB } from "../../modules/Settings"
import "./Registration.css"
import APIManager from '../../modules/APIManager';
import "./Login.css"


function RegistrationForm(props) {

    const [ credentials, setCredentials ] = useState({ email: "", password: "", confirmPassword: "",  successMessage: null });

    const handleFieldChange = (event) => {
        
        const stateToChange = { ...credentials };
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    }

    const handleRegistration = () => {
        if(credentials.email.length && credentials.password.length) {
            props.showError(null);

            APIManager.getAllUsers()
            .then(users => {

               if ( users.length > 0) { 
               if ( (users.some(user => user.email === credentials.email)) === true ) {
                props.showError('This email has already been registered')  }
               } else {

                    const newUserObj={
                        "email": credentials.email,
                        "password": credentials.password,
                    }

                    return fetch(`${jsonDB}/users`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newUserObj)})
                            .then((response) => {
                               
                                if(response.ok){
                                    setCredentials(stateToChange => ({
                                        ...credentials,
                                        'successMessage' : 'Registration successful. Redirecting to home page..'
                                    }))
                                    if (document.getElementById("localCreds").checked === true) {
                                        props.setUser(newUserObj,"local");
                                    } else {
                                        props.setUser(newUserObj,"session")
                                    };
                                    redirectToHome();
                                    props.showError(null)
                                } else {
                                    props.showError("Some error ocurred");
                                }
                    })
                    
               } //end else
            })
    
        } else {
            props.showError('Please enter valid username and password')    
        }

    }
   
    const redirectToHome = () => {
        props.history.push('/');
    }
 
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(credentials.password === credentials.confirmPassword) {
            handleRegistration()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
    <div className="container__login">
        <div className="container__form__login">
        
            <form>
            <fieldset className="form__fieldset__reg">
                <div className="form-group text-left">
                
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       autoComplete="username"
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={credentials.email}
                       onChange={handleFieldChange}
                />
               </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        autoComplete="current-password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleFieldChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        autoComplete="current-password"
                        placeholder="Confirm Password"
                        value={credentials.confirmPassword}
                        onChange={handleFieldChange} 
                    />
                </div>
                <div className="form-group text-left">
                <input type="checkbox" value="localCreds" id="localCreds" onChange={handleFieldChange}/>
                <label htmlFor="localCreds">Remember Me</label>
                
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
                </div>
                <div className="mt-2">
                <span>Already have an account? </span>
                <Link to={`/login`}>
              <button>Login Here</button>
            </Link>
            </div>
                </fieldset>


            </form>
            <div className="alert alert-success mt-2" style={{display: credentials.successMessage ? 'block' : 'none' }} role="alert">
                {credentials.successMessage}
            </div>
            
        
        </div>
    </div>
    )
}

export default withRouter(RegistrationForm);
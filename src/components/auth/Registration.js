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
               if ( (users.some(user => user.email === credentials.email)) === true ) {
                props.showError('This email has already been registered')  
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
        // props.updateTitle('Home')
        props.history.push('/home');
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
    <div className="container__home">
        <div className="container__form__login">
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
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

            </form>
            <div className="alert alert-success mt-2" style={{display: credentials.successMessage ? 'block' : 'none' }} role="alert">
                {credentials.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <Link to={`/login`}>
              <button>Login Here</button>
            </Link>
            </div>
            </div>
        </div>
    </div>
    )
}

export default withRouter(RegistrationForm);
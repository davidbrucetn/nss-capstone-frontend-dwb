import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [ credentials, setCredentials ] = useState({ email: "", password: "" });
    
    
    // Update state whenever an input field is edited
    const handleFieldChange = (evt) => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        /*
            For now, just store the email and password that
            the customer enters into session storage.
        */
        if (document.getElementById("localCreds").checked === true) {
            props.setUser(credentials,"local");
        } else {
            props.setUser(credentials,"session")
        };
    
        props.history.push("/");
    }

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
export default Login;
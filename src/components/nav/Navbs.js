import React, { useState } from 'react'
import { NavLink as RRNavLink, withRouter  } from "react-router-dom";
import { FaHome } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./NavBar.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarBrand,
} from 'reactstrap';

const NavbarMenu = (props) => {
    const [cityStateStr, setCityStateStr] = useState("")
    const [searchCitySt,setCitySt] = useState({ city: "", state :""})
    const [ validateMsg, setValidateMsg ] = useState("")
    let locationPath = "";

    
    // handleFieldChange called from button onChange event, will update object as characters are typed in the fields. 
  const handleFieldChange = evt => {
    setValidateMsg("")
    const cityState = {}
    // stateToChange is previous keys/values in event with spread (...)
    if (evt.target.value.match("^[a-zA-Z,' -]*$") != null)
    {   setCityStateStr(evt.target.value)
        if (evt.target.value.indexOf(',') > -1) {
            cityState.city = evt.target.value.split(",")[0].trim()
            cityState.state = evt.target.value.split(",")[1].trim()
            setCitySt(cityState)
            
        }
   } 
  };

  function clearInputBox() {
      setCityStateStr("");
  }


  const handleValidation = evt => {

      if (evt.target.value.indexOf(',') < 0) {
            setValidateMsg(<div className="validate__message">Must have <em>City, State</em> to search</div>)
      } else { setTimeout(clearInputBox,5000) }

  }
  
    const handleLogout = () => {
      props.clearUser();
      props.history.push('/');
    }
        if (searchCitySt.city === "" && searchCitySt.state === "") {
            locationPath = "";
        } else {
            locationPath = `/${searchCitySt.state}/${searchCitySt.city}`;
        }



        return (
            <div>
                <Navbar className="faded navbar" toggleable="xs" color="faded" light expand="md">

                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav navbar>
                            <NavbarBrand>
                            <img
                                src={require("./images/smallLogo.png")}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            </NavbarBrand>
                          
                            <NavItem>
                                <NavLink id="homeNav" tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/"><FaHome /></NavLink>
                            </NavItem>
                            

                            {props.hasUser ? 
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret >
                                    Your Collection
                                </DropdownToggle>
                                    <DropdownMenu right >
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/collection`} >
                                            All
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/saveddelivery`} >
                                            Delivery
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/saveddrivethru`} >
                                            Drive-Thru
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/savedoutdoor`} >
                                            Outdoor Seating
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/savedtakeout`} >
                                            Take Out
                                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            : null }

                            {props.hasUser ? 
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret >
                                    Search Restaurants
                                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/restaurant${locationPath}`} >
                                            All
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/delivery${locationPath}`} >
                                            Delivery
                                        </DropdownItem>
                                        <DropdownItem  tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/drivethru${locationPath}`} >
                                            Drive-Thru
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/outdoor${locationPath}`} >
                                            Outdoor Seating
                                        </DropdownItem>
                                        <DropdownItem  tag={RRNavLink} className="nav-link" activeClassName="selected" exact to={`/takeout${locationPath}`} >
                                            Take Out
                                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            : null }
                            
                            {props.hasUser
                                ?<li>
                                <span className="inline__search" ><input className="cityStateSearch" type="text" value={cityStateStr} onBlur={handleValidation} onChange={handleFieldChange} placeholder="City, State"></input>{validateMsg} </span>
                            </li>
                                :  <li>
                                <NavLink className="nav-link" to="/login"> Login </NavLink>
                            </li>}
                          
                                                        
                            <NavItem>
                             {props.hasUser
                                ? <span className="nav-link" onClick={handleLogout} > Logout </span>
                                :  
                                null
                                }
                            </NavItem>
                            <NavItem>
                             {props.hasUser
                                ? <NavLink tag={RRNavLink} className="nav-link" to="/usersettings"> User Settings </NavLink>
                                :  
                                null
                                }
                            </NavItem>



                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        )
}

export default withRouter(NavbarMenu)
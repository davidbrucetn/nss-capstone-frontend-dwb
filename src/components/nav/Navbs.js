import React from 'react'
import { NavLink as RRNavLink, withRouter  } from "react-router-dom";
import { FaHome } from "react-icons/fa"
// import RestaurantSearch from "../restaurant/RestaurantSearch"
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

    
  
    const handleLogout = () => {
      props.clearUser();
      props.history.push('/');
    }
  
    
        return (
            <div>
                <Navbar className="faded navbar" color="faded" light expand="xs">

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
                                <NavLink tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/"><FaHome /></NavLink>
                            </NavItem>
                            

                            {props.hasUser ? 
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Your Collection
                                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/collection">
                                            All
                                        </DropdownItem>
                                        <DropdownItem>
                                            Delivery
                                        </DropdownItem>
                                        <DropdownItem>
                                            Drive-Thru
                                        </DropdownItem>
                                        <DropdownItem>
                                            Outdoor Seating
                                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            : null }

                            {props.hasUser ? 
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Search Restaurants
                                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/restaurant">
                                            All
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/delivery">
                                            Delivery
                                        </DropdownItem>
                                        <DropdownItem  tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/drivethru">
                                            Drive-Thru
                                        </DropdownItem>
                                        <DropdownItem tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/outdoor">
                                            Outdoor Seating
                                        </DropdownItem>
                                        <DropdownItem  tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/takeout">
                                            Take Out
                                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            : null }
                            
                          
                                                        
                            <NavItem>
                             {props.hasUser
                                ? <span className="nav-link" onClick={handleLogout}> Logout </span>
                                :  
                                <NavLink tag={RRNavLink} className="nav-link" to="/login"> Login </NavLink>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        )
}

export default withRouter(NavbarMenu)
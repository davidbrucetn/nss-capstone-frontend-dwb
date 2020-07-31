import React, { Component } from 'react'
import { NavLink as RRNavLink, withRouter  } from "react-router-dom";
import { FaHome } from "react-icons/fa"
import Home from "../home/Home"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./NavBarDemo.css"
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
} from 'reactstrap';
const NavbarDemo = (props) => {

    let navKey=0;
  
    const handleLogout = () => {
      props.clearUser();
      props.history.push('/');
    }
  
    
        return (
            <div>
                <Navbar className="faded navbar" color="faded" light expand="xs">NavBar
                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} className="nav-link" activeClassName="selected" exact to="/"><FaHome /></NavLink>
                            </NavItem>

                            <NavItem>
                             {props.hasUser
                                ? <span className="nav-link" onClick={handleLogout}> Logout </span>
                                :  
                                <NavLink tag={RRNavLink} className="nav-link" to="/login"> Login </NavLink>
                                }
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
                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        )
}

export default withRouter(NavbarDemo)
import React from 'react'
import {Navbar, Nav, NavDropdown,Button,Form, FormControl} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Top(props){
    return(
        <Navbar>
            <Link to="/">
                <Navbar.Brand>
                    Fast Firestore
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <div className="header-opt">
                        <Link to="/About">
                            About
                        </Link>
                    </div>
                
                    <div className="header-opt">
                        <Link to="/Contact">
                            Contact
                        </Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
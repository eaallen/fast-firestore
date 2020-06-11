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
                    <Link to="/About">
                        <Nav>
                            About
                        </Nav>
                    </Link>
                    <Link to="/Contact">
                        <Nav>
                            Contact
                        </Nav>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
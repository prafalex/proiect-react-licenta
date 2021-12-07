import React from "react";
import {  useAuth } from "../contexts/AuthContext";
import "react-bootstrap";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function NavBar() {
    const {currentUser}=useAuth()
    console.log(currentUser)
    return (
      <>
        <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand> NavBar</Navbar.Brand>
              <Navbar.Toggle arie-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>Home</Nav.Link>
                  <Nav.Link>Test1</Nav.Link>
                </Nav>
                <Nav>
                 <div className="d-flex gap-2">
                    {currentUser==null && <Link to="/signup">
                      <Button variant="outline-primary">Sign Up</Button>
                    </Link> }
                    
                      {currentUser==null && <Link to="/login">
                        <Button>Login</Button>{" "}
                      </Link>}
                      {currentUser!=null && <Link to="/dashboard"><Button>Dashboard</Button> </Link>}
                   
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </>
    );
  }



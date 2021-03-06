import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import 'react-bootstrap'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function NavBar() {
  const { currentUser } = useAuth()
  return (
    <>
      <Container className="">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand> NavBar</Navbar.Brand>
            <Navbar.Toggle arie-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  <Link to="/" style={{ textDecoration: 'none', color:'grey' }}>
                    Home
                  </Link></Nav.Link>
                <Nav.Link >
                <Link to="/test1" style={{ textDecoration: 'none', color:'grey' }}>
                    Test1
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/404" style={{ textDecoration: 'none', color:'grey' }}>
                    404
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav>
                <div className="d-flex gap-2">
                  {currentUser == null && (
                    <Link to="/signup">
                      <Button variant="outline-primary">Sign Up</Button>
                    </Link>
                  )}
                  {currentUser == null && (
                    <Link to="/login">
                      <Button>Login</Button>{' '}
                    </Link>
                  )}
                  {currentUser != null && (
                    <>
                      <Link to="/dashboard">
                        <Button>Dashboard</Button>{' '}
                      </Link>
                  
                    </>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  )
}

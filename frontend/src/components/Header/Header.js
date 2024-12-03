import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <div className="container">
        <Navbar.Brand href="/dashboard">A59</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" active={location.pathname === "/dashboard"}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/summary" active={location.pathname === "/summary"}>
              Summary
            </Nav.Link>
            <Nav.Link href="/reports" active={location.pathname === "/reports"}>
              Reports
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;

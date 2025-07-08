import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import LogoutButton from "../components/logoutButton/LogoutButton";

/**
 * NavBar Component
 * Navigation bar that displays dashboard, events and help and navigates
 * to the links
 * Only displays events if user is logged in.
 * Includes our login button for ease of access.
 */

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Event Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/help">
              Help
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <LogoutButton />
      </Container>
    </Navbar>
  );
}

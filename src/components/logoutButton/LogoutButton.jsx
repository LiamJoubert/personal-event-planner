import { Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

/**
 * Logout Button Component
 * Button that allows the user to logout and redirects them to the dashboard
 * Calls the logout function from UserContext.
 */

export default function LogoutButton() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to dashboard
  };

  return (
    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}

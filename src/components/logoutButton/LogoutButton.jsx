import { Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function LogoutButton() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to dashboard
  };

  return (
    <Button
      variant="outline-danger"
      size="sm"
      onClick={handleLogout}
      className="position-absolute top-0 end-0 m-3"
    >
      Logout
    </Button>
  );
}

import { useContext, useState } from "react";
import NavBar from "../../routes/NavBar";
import LoginForm from "../loginForm/LoginForm";
import { UserContext } from "../../context/UserContext";
import RegisterForm from "../registerForm/RegisterForm";

/**Dashboard Component
 * Main Landing Page for users. New and already registered.
 * If a user is logged in, displays a short welcome message.
 */
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <NavBar />
      <main className="container mt-4">
        {user ? (
          <>
            <h2>Welcome, {user.name}!</h2>
          </>
        ) : showRegister ? (
          <>
            <RegisterForm />
            <p className="text-center mt-3">
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setShowRegister(false)}
              >
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        )}
      </main>
    </>
  );
}

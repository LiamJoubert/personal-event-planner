import React, { useContext } from "react";
import NavBar from "../../routes/NavBar";
import LoginForm from "../loginForm/LoginForm";
import { UserContext } from "../../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <main className="container mt-4">
        {user ? <h2>Welcome, {user.name}!</h2> : <LoginForm />}
      </main>
    </>
  );
}

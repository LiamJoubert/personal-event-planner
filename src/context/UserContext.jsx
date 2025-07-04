import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameExists = users.some((u) => u.username === newUser.username);
    const emailExists = users.some((u) => u.email === newUser.email);

    if (usernameExists) {
      alert("Username already taken");
      return;
    }

    if (emailExists) {
      alert("Email already registered");
      return;
    }

    const userToSave = { ...newUser, events: [] };
    const updatedUsers = [...users, userToSave];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(userToSave);
    localStorage.setItem("currentUser", JSON.stringify(userToSave));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

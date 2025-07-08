import { createContext, useState, useEffect } from "react";

/**
 * UserContext
 *
 * Stores and provides global states and functions for user Authentication
 * and event management.
 * Stores the data in local storage
 * Contains login, logout and register functions to be called by other components
 * Manages event creation, editing and deleting.
 * Loads the current user data on start.
 */

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const deleteEvent = (eventId) => {
    const updatedUser = {
      ...user,
      events: user.events.filter((event) => event.id !== eventId),
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

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

  const addEvent = (event) => {
    const updatedUser = {
      ...user,
      events: [...(user.events || []), event],
    };

    // Update users array in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateEvent = (updatedEvent) => {
    const updatedUser = {
      ...user,
      events: user.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
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
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        addEvent,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

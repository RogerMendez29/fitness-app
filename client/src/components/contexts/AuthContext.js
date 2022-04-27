import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);

  function handleLogout() {
    fetch(`/api/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setCurrentUser(null);
      }
    });
  }

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
    fetch("/api/me")
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setCurrentUser(user);
          });
        }
      })
      .then(() => setLoading(false));
  }, []);

  const value = {
    currentUser,
    users,
    setUsers,
    setCurrentUser,
    handleLogout,
    workouts,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

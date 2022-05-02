import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [users, setUsers] = useState([]);

  function login(email, password) {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }

  function handleLogout() {
    fetch(`/api/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setCurrentUser(null);
        const event = new CustomEvent("authStateChange");
        document.dispatchEvent(event);
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
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
    fetch("/api/me").then((res) => {
      if (res.ok) {
        console.log("good");

        res.json().then((user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      }
    });
  }, []);

  const value = {
    exercises,
    currentUser,
    users,
    setUsers,
    setCurrentUser,
    login,
    handleLogout,
    workouts,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

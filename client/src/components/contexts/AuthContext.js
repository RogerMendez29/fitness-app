import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [followeeIds, setFolloweeIds] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [error, setError] = useState("");

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
          setError("");
        });
      } else {
        res.json().then((error) => {
          setError(Object.values(error));
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

        // const event = new CustomEvent("authStateChange");
        // document.dispatchEvent(event);
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
    fetch("/api/workout_exercises")
      .then((res) => res.json())
      .then((data) => setWorkoutExercises(data));
    fetch("/api/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setFollowees(user.followees);
          setFollowers(user.followers);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const value = {
    error,
    followeeIds,
    workoutExercises,
    followees,
    followers,
    exercises,
    currentUser,
    users,
    setWorkoutExercises,
    setWorkouts,
    setFollowees,
    setFollowers,
    setUsers,
    setCurrentUser,
    login,
    handleLogout,
    setFolloweeIds,
    workouts,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

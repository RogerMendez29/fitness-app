import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);


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
    workouts,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

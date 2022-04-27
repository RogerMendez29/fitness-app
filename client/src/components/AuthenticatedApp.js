import { Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonList,
  IonItem,
} from "@ionic/react";
import Home from "../pages/Home";
import Calender from "../pages/Calender";
import Profile from "../pages/Profile";
import UserPage from "../pages/UserPage";

import NavBar from "../components/Navbar";
import { IonReactRouter } from "@ionic/react-router";

function AuthenticatedApp({ setCurrentUser, currentUser }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

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

  function renderWorkouts(workouts) {
    const workoutCards = workouts?.map((workout) => {
      if (workout.workout_exercises?.length > 0) {
        return (
          <ion-card key={workout.id}>
            <ion-card-header>
              <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
              <ion-card-title>{workout.name}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              {workout.workout_exercises?.map((exercise) => {
                return (
                  <IonList key={exercise.id}>
                    <IonItem>
                      <IonLabel> {exercise.name}</IonLabel>
                      <IonLabel> Sets: {exercise.sets}</IonLabel>
                      <IonLabel> Reps: {exercise.reps}</IonLabel>
                      <IonLabel> Rest: {exercise.rest}</IonLabel>

                      <IonLabel> Weight: {exercise.weight}</IonLabel>
                      <IonLabel> Time: {exercise.time} s</IonLabel>
                      <IonLabel> Distance: {exercise.distance}</IonLabel>
                    </IonItem>
                  </IonList>
                );
              })}
            </ion-card-content>
          </ion-card>
        );
      } else {
        return null;
      }
    });
    return workoutCards;
  }

  return (
    <div>
        <NavBar logout={handleLogout} currentUser={currentUser} />

        <IonRouterOutlet>
          <Route exact path="/home">
            <Home
              currentUser={currentUser}
              renderWorkouts={renderWorkouts}
              workouts={workouts}
            />
          </Route>
          <Route exact path="/calender">
            <Calender currentUser={currentUser} />
          </Route>
          <Route exact path="/profile">
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              renderWorkouts={renderWorkouts}
              workouts={workouts}
            />
          </Route>
          <Route exact path="/user_page/:id">
            <UserPage
              currentUser={currentUser}
              workouts={workouts}
              setCurrentUser={setCurrentUser}
              renderWorkouts={renderWorkouts}
            />
          </Route>
          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
    </div>
  );
}

export default AuthenticatedApp;

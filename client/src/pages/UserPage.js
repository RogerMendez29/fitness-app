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
} from "@ionic/react";
import Profile from "./Profile";

function UserPage({ currentUser, workouts, setCurrentUser, renderWorkouts }) {
  return (
    <Profile
      workouts={workouts}
      currentUser={currentUser}
      renderWorkouts={renderWorkouts}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default UserPage;

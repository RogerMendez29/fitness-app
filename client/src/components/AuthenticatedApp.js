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
import Home from "../pages/Home";
import Calender from "../pages/Calender";
import Profile from "../pages/Profile";


import NavBar from "../components/Navbar";
import { IonReactRouter } from "@ionic/react-router";

function AuthenticatedApp({ setCurrentUser }) {
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

  return (
    <div>
      <IonReactRouter>
        <NavBar logout={handleLogout} />

        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/calender" component={Calender} />
          <Route exact path="/profile">
            <Profile />
          </Route>

          <Redirect to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </div>
  );
}

export default AuthenticatedApp;

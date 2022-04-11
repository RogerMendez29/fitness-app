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
import NavBar from "../components/Navbar";

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
      <NavBar logout={handleLogout}/>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>

        <Redirect to="/home" />
      </IonRouterOutlet>
    </div>
  );
}

export default AuthenticatedApp;

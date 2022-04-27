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
import { IonReactRouter } from "@ionic/react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

function UnauthenticatedApp({ setCurrentUser }) {
  return (
    
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/signup">
          <Signup setCurrentUser={setCurrentUser} />
        </Route>
        <Route>
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
  );
}

export default UnauthenticatedApp;

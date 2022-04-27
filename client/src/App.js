import { Redirect, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./components/contexts/AuthContext.js";
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

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Content from "./components/Content";

import "./theme/app.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/login">
                <PublicRoute>
                  <Login />
                </PublicRoute>
              </Route>
              <Route exact path="/signup">
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              </Route>
              <Route path="/">
                <PrivateRoute>
                  <Content></Content>
                </PrivateRoute>
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;

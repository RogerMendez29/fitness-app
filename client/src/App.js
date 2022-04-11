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

import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";

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
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  console.log(currentUser);

  useEffect(() => {
    fetch("/api/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user));
        setLoading(true);
      } else {
        setLoading(true);
      }
    });
  }, []);

  if (!loading) {
    return <div></div>;
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          {currentUser ? (
            <AuthenticatedApp setCurrentUser={setCurrentUser} />
          ) : (
            <UnauthenticatedApp setCurrentUser={setCurrentUser} />
          )}
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;

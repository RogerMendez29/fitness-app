import { Route, NavLink, Switch } from "react-router-dom";
import { ellipse, square, triangle } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";

import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonPopover,
  IonAvatar,
  IonToolbar,
  IonList,
  IonButton,
  IonItem,
  IonHeader,
} from "@ionic/react";
import Home from "../pages/Home";
import Calender from "../pages/Calender";
import Profile from "../pages/Profile";
import NavBar from "../components/Navbar";

import { useAuth } from "../components/contexts/AuthContext";

const Content = () => {
  const { handleLogout, currentUser } = useAuth();

  return (
    <div>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/calender">
              <Calender />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/user_page/:id">
              <Profile />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="calender" href="/calender">
              <IonIcon icon={ellipse} />
              <IonLabel>Calender</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={square} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <NavBar />

    </div>
  );
};

export default Content;

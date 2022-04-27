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

// import "./Content.css";

const Content = () => {
  const { handleLogout, currentUser } = useAuth();

  function profile_image() {
    return currentUser.profile?.profile_thumbnail ? (
      <img src={currentUser.profile.profile_thumbnail} />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512"
      >
        <title>Person Circle</title>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
      </svg>
    );
  }
  function initPopover(e) {
    const popover = e.target;
    const logoutBtn = popover.querySelector("#logout-btn");

    logoutBtn.addEventListener("click", () => {
      handleLogout();
      popover.dismiss();
    });
  }
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* <Switch> */}
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
          {/* </Switch> */}
        </IonRouterOutlet>
        <IonTabBar slot="top">
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

          <IonTabButton tab="tab4">
            <IonAvatar className="avatar" slot="" id="trigger-button">
              {profile_image()}
            </IonAvatar>
            <IonPopover onDidPresent={initPopover} trigger="trigger-button">
              <IonList>
                <IonItem button id="logout-btn">
                  <IonButton> Log Out</IonButton>
                </IonItem>
              </IonList>
            </IonPopover>
            <IonLabel></IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Content;

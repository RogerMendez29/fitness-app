import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ellipse, square, triangle } from "ionicons/icons";

import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonPopover,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonNav,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonTabButton,
} from "@ionic/react";
import "../theme/Navbar.css";
import { useAuth } from "./contexts/AuthContext";

function NavBar() {
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
    <div>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home">
          <IonIcon icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/calender">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/profile">
          <IonIcon icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/calender">
            Calender
          </NavLink>

          
        </IonToolbar>
      </IonHeader>
    </div>
  );
}

export default NavBar;

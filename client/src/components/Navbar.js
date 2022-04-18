import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "@ionic/react";
import "../theme/Navbar.css";

function NavBar({ logout }) {
  return (
    <IonHeader>
      <IonToolbar>
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>

        <NavLink className="nav-link" to="/calender">
          Calender
        </NavLink>
        <NavLink className="nav-link" to="/profile">
          profile
        </NavLink>

        <IonButton onClick={logout} slot="end">
          Logout
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
}

export default NavBar;

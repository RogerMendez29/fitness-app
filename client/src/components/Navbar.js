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
} from "@ionic/react";

function NavBar({ logout }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonToolbar>
    </IonHeader>
  );
}

export default NavBar;

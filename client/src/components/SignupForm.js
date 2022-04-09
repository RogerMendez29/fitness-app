import React, { useRef, useState } from "react";
import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "../theme/LoginForm.css";

const SignupForm = () => {
  

  return (
    <div className="login-card">
      <IonCard class="login-form">
        <IonCardHeader>
          <IonCardTitle>Fit World</IonCardTitle>
        </IonCardHeader>
        <IonInput
          class="login-input"
          type="text"
          placeholder="Email"
          required
        ></IonInput>
        <IonInput
          class="login-input"
          type="text"
          placeholder="Phone"
          required
        ></IonInput>
        <IonInput
          class="login-input"
          type="password"
          placeholder="Password"
          required
        ></IonInput>
        <IonInput
          class="login-input"
          type="password "
          placeholder="Password Confirmation"
          required
        ></IonInput>
        <IonButton expand="block" class="login-btn">
          Login
        </IonButton>
        <IonItem href="#login" className="ion-activated">
          <IonLabel>Already have an account? Login</IonLabel>
        </IonItem>
      </IonCard>
    </div>
  );
};

export default SignupForm;
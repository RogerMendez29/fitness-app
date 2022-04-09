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

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

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
          ref={emailRef}
          required
        ></IonInput>
        <IonInput
          class="login-input"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        ></IonInput>
        <IonButton expand="block" class="login-btn">
          Login
        </IonButton>
        <IonItem href="signup" className="ion-activated">
          <IonLabel>Need an account? Sign Up</IonLabel>
        </IonItem>
      </IonCard>
    </div>
  );
};

export default LoginForm;
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

const LoginForm = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }

  return (
    <div className="login-card">
      <IonCard class="login-form">
        <form onSubmit={handleLogin}>
          <IonCardHeader>
            <IonCardTitle>Fit World</IonCardTitle>
          </IonCardHeader>
          <IonInput
            class="login-input"
            type="text"
            placeholder="Email"
            onIonChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></IonInput>
          <IonInput
            class="login-input"
            type="password"
            placeholder="Password"
            onIonChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></IonInput>
          <IonButton expand="block" class="login-btn" type='submit'>
            Login
          </IonButton>
          <IonItem href="signup" className="ion-activated">
            <IonLabel>Need an account? Sign Up</IonLabel>
          </IonItem>
        </form>
      </IonCard>
    </div>
  );
};

export default LoginForm;

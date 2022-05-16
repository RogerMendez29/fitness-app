import React, { useRef, useState } from "react";
import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { useAuth } from "./contexts/AuthContext";
import "../theme/LoginForm.css";
import { warning } from "ionicons/icons";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();

  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="login-card">
      <IonCard class="login-form">
        <form className="form" onSubmit={handleLogin}>
          <ion-card-header>
            <ion-card-title
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "25px",
              }}
              className="title"
            >
              Fit World
            </ion-card-title>
          </ion-card-header>
          {error && (
            <IonItem className="user-flow-ntfy" color="danger" shape="round">
              <p slot="start">{error}</p>
              {<IonIcon className="icon" icon={warning}></IonIcon>}
            </IonItem>
          )}
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
          <IonButton expand="" class="login-btn" type="submit">
            Login
          </IonButton>

          <IonItem href="signup" className="link">
            <IonLabel>Need an account? Sign Up</IonLabel>
          </IonItem>
        </form>
      </IonCard>
    </div>
  );
};

export default LoginForm;

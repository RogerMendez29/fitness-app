import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import "../theme/Login.css"

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
  const history = useHistory();

  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  function navToSetup() {
    history.push("/accout-setup");
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        phone,
        password_confirmation: passwordConfirmation,
      }),
    }).then((res) => {
      if (res.ok) {
        navToSetup();

        res.json().then((user) => {
          setCurrentUser(user);
        });
      } else {
        res.json().then((errors) => {
          setErrors(errors.error);
        });
      }
    });
  }

  function renderErrors(errors) {
    let erorrMessage = Object.entries(errors);

    return erorrMessage.map((error) => {
      return (
        <ion-text className="errors" color="danger"     >{`${
          error[0]
        }: ${error[1].join()}`}</ion-text>
      );
    });
  }

  return (
    <div className="login-card">
      <IonCard class="login-form">
        {renderErrors(errors)}
        <form onSubmit={handleSubmit}>
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
            type="text"
            placeholder="Phone"
            onIonChange={(e) => setPhone(e.target.value)}
            value={phone}
          ></IonInput>
          <IonInput
            class="login-input"
            type="password"
            placeholder="Password"
            onIonChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></IonInput>
          <IonInput
            class="login-input"
            type="password"
            placeholder="Password Confirmation"
            onIonChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            required
          ></IonInput>
          <IonButton
            expand="block"
            class="login-btn"
            type="submit"
            // href="account-setup"
          >
            Sign up
          </IonButton>
          <IonItem href="login" className="ion-activated">
            <IonLabel>Already have an account? Login</IonLabel>
          </IonItem>
        </form>
      </IonCard>
    </div>
  );
};

export default SignupForm;

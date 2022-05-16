import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import "../theme/Login.css";
import { Redirect } from "react-router-dom";
import { warning } from "ionicons/icons";

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
import "../theme/LoginForm.css";

const SignupForm = () => {
  const history = useHistory();

  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  
  function handleSubmit(event) {
    event.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username: username,
        password,
        phone,
        password_confirmation: passwordConfirmation,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          history.push({
            pathname: "/account-setup",
            state: { fromSignup: true },
          });
          setCurrentUser(user);
          console.log(history);

          // <Redirect to="/account-setup" />;
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
        <IonItem
          style={{
            margin: ".3rem",
          }}
          className="user-flow-ntfy"
          color="danger"
          shape="round"
        >
          <p
            style={{
              fontWeight: "bold",
            }}
            slot="start"
          >
            {error[0]} {error[1]}
          </p>
          {<IonIcon className="icon" icon={warning}></IonIcon>}
        </IonItem>

        
      );
    });
  }

  return (
    <div className="login-card">
      <IonCard class="login-form">
        {renderErrors(errors)}
        <form className="form" onSubmit={handleSubmit}>
          <IonCardHeader>
            <IonCardTitle
              color="light"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              Sign up
            </IonCardTitle>
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
            placeholder="Username"
            onIonChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          ></IonInput>
          <IonInput
            class="login-input"
            type="text"
            placeholder="Optional: Phone"
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
            expand=""
            class="login-btn"
            type="submit"
            // href="account-setup"
          >
            Sign up
          </IonButton>
          <IonItem href="login" className="link">
            <IonLabel>Already have an account? Login</IonLabel>
          </IonItem>
        </form>
      </IonCard>
    </div>
  );
};

export default SignupForm;

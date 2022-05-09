import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import EditProfileForm from "./EditProfileForm";

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

const SetupForm = ({ setEditing }) => {
  const { setCurrentUser, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
        res.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }

  return (
    <div className="login-card">
      <IonCard class="login-form">
        <EditProfileForm
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </IonCard>
    </div>
  );
};

export default SetupForm;

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

  

  return (
    <div className="login-card">
      <IonCard class="">
        <EditProfileForm
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </IonCard>
    </div>
  );
};

export default SetupForm;

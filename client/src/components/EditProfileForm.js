import "../theme/Profile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonTitle,
  IonCard,
  IonItem,
  IonInput,
  IonTextarea,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";

function EditProfileForm({ currentUser, setEditing, setCurrentUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fitness, setFitness] = useState("");
  const [weight, setWeight] = useState();
  const [bodyFat, setBodyFat] = useState();
  const [height, setHeight] = useState({
    ft: "",
    inches: "",
  });
  const [bio, setBio] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/profiles/${currentUser.profile.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.id,
        first_name: firstName,
        last_name: lastName,
        fitness_level: fitness,
        weight: weight,
        bodyfat: bodyFat,
        height: height.ft + height.inches,
      }),
    }).then((res) => {
      if (res.ok) {
        setEditing(false);
        console.log("sucess");
        res.json().then((data) => {
          fetch("/api/me").then((res) => {
            if (res.ok) {
              res.json().then((user) => {
                setCurrentUser(user);
              });
            }
          });
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <IonItem>
        <IonInput
          value={firstName}
          onIonChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          value={lastName}
          onIonChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Fitness Level</IonLabel>
        <IonSelect
          value={fitness}
          placeholder="Select One"
          onIonChange={(e) => setFitness(e.detail.value)}
        >
          <IonSelectOption value="Beginner">Beginner</IonSelectOption>
          <IonSelectOption value="Intermediate">Intermediate</IonSelectOption>
          <IonSelectOption value="Advanced">Advanced</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <ion-label>Height</ion-label>
        <IonInput
          onIonChange={(e) => setHeight({ ...height, ft: e.target.value })}
          placeholder="ft"
          type="number"
        ></IonInput>
        <IonInput
          onIonChange={(e) => setHeight({ ...height, inches: e.target.value })}
          placeholder="inches"
          type="number"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          value={weight}
          onIonChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          type="number"
        ></IonInput>
        <IonInput
          value={bodyFat}
          onIonChange={(e) => setBodyFat(e.target.value)}
          placeholder="Body-fat"
          type="number"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonTextarea
          value={bio}
          onIonChange={(e) => setBio(e.target.value)}
          className="description-box"
          placeholder="Bio"
        ></IonTextarea>
      </IonItem>
      <IonButton type="submit">Submit</IonButton>
    </form>
  );
}

export default EditProfileForm;

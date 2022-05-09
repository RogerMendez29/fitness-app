import "../theme/Profile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

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

function EditProfileForm({ currentUser, setEditing, setCurrentUser, editing }) {
  const [firstName, setFirstName] = useState(currentUser.profile.first_name);
  const [lastName, setLastName] = useState(currentUser.profile.last_name);
  const [fitness, setFitness] = useState(currentUser.profile.fitness_level);
  const [weight, setWeight] = useState(currentUser.profile.weight);
  const [bodyFat, setBodyFat] = useState(currentUser.profile.bodyfat);
  const [bio, setBio] = useState(currentUser.profile.bio);
  const firstDigit = String(currentUser.profile.height)[0];
  const secondDigit = String(currentUser.profile.height)[1];

  const [height, setHeight] = useState({
    ft: firstDigit,
    inches: secondDigit,
  });
  const history = useHistory();

  const navToHome = () => {
    history.push("/home");
  };

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
        bio: bio,
      }),
    }).then((res) => {
      if (res.ok) {
        // setEditing(false)
        // navToHome()
        {
          editing ? setEditing(false) : navToHome();
        }

        res.json().then((data) => {
          setCurrentUser({ ...currentUser, profile: data });
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <IonItem>
        <IonInput
          required
          value={firstName}
          onIonChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          required
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
        <ion-label>Height: ft'</ion-label>
        <IonInput
          onIonChange={(e) => setHeight({ ...height, ft: e.target.value })}
          placeholder="ft"
          type="number"
          value={height.ft}
        ></IonInput>
        <ion-label>Inches"</ion-label>

        <IonInput
          onIonChange={(e) => setHeight({ ...height, inches: e.target.value })}
          placeholder="inches"
          type="number"
          value={height.inches}
        ></IonInput>
      </IonItem>

      <IonItem>
        <ion-label>Weigth Ibs</ion-label>

        <IonInput
          value={weight}
          onIonChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          type="number"
        ></IonInput>
        <ion-label>Body Fat %</ion-label>

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
      <IonButton className="edit" type="submit">
        Submit
      </IonButton>
    </form>
  );
}

export default EditProfileForm;

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
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";
import { renderWorkouts } from "../components/Utils";
import NavBar from "../components/Navbar";

const Profile = () => {
  const { currentUser, workouts } = useAuth();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fitness, setFitness] = useState("");
  const [weight, setWeight] = useState();
  const [bodyFat, setBodyFat] = useState();

  let workoutIds = currentUser.workouts?.map((workout) => {
    return workout.id;
  });

  let userPosts = workouts?.filter((workout) => {
    return workoutIds.includes(workout.id);
  });

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
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("sucess");
        res.json();
      } else {
        console.log("failed");
      }
    });
  }

  return (
    <IonPage className="profile-page">
      <NavBar />
      <IonContent class="profile-page-content">
        <div className="profile-content">
          <div className="profile-data">
            <div className="image-container"></div>

            <IonButton>upload</IonButton>
            <IonButton
              onClick={() => setEditing(!editing)}
              className="edit-profile-btn"
            >
              edit profile
            </IonButton>

            {editing ? (
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
                  <IonInput
                    value={fitness}
                    onIonChange={(e) => setFitness(e.target.value)}
                    placeholder="Fitness level"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <ion-label>Height:</ion-label>
                  <ion-input placeholder="ft" type="number"></ion-input>
                  <ion-input placeholder="inches" type="number"></ion-input>
                </IonItem>
                <ion-item>
                  <ion-input
                    value={weight}
                    onIonChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight"
                    type="number"
                  ></ion-input>
                  <ion-input
                    value={bodyFat}
                    onIonChange={(e) => setBodyFat(e.target.value)}
                    placeholder="Body-fat"
                    type="number"
                  ></ion-input>
                </ion-item>
                <IonItem>
                  <IonTextarea
                    // value={description}
                    // onIonChange={(e) => setDescription(e.target.value)}
                    className="description-box"
                    placeholder="Bio"
                  ></IonTextarea>
                </IonItem>
                <IonButton type="submit">Submit</IonButton>
              </form>
            ) : (
              <IonCardHeader>
                <IonCardTitle>{currentUser.profile.first_name}</IonCardTitle>
                <IonCardSubtitle>date joined</IonCardSubtitle>
                <IonCardSubtitle>followers/following</IonCardSubtitle>
              </IonCardHeader>
            )}

            {/* <IonTitle className="post-title">Posts</IonTitle> */}
            <div>{renderWorkouts(userPosts)}</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

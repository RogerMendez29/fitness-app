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
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";
import { renderWorkouts } from "../components/Utils";
import NavBar from "../components/Navbar";
import CloudinaryUpload from "../components/CloudinaryUpload";

const Profile = ({ user, currentUser }) => {
  const { workouts, setCurrentUser } = useAuth();
  const [editing, setEditing] = useState(false);
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

  function dateJoined() {
    if (user) {
      let date = user?.created_at;
      let parsed = Date.parse(date);
      let newDate = new Date(parsed).toISOString().slice(0, 10);
      return newDate;
    } else {
      let date = currentUser?.created_at;
      let parsed = Date.parse(date);
      let newDate = new Date(parsed).toISOString().slice(0, 10);
      return newDate;
    }
  }

  function sortUsers() {
    if (user) {
      let workoutIds = user?.workouts?.map((workout) => {
        return workout?.id;
      });
      let userPosts = workouts?.filter((workout) => {
        return workoutIds.includes(workout.id);
      });
      return userPosts;
    } else {
      let workoutIds = currentUser?.workouts?.map((workout) => {
        return workout?.id;
      });
      let userPosts = workouts?.filter((workout) => {
        return workoutIds.includes(workout.id);
      });
      return userPosts;
    }
  }

  function handleUpload(result) {
    const body = {
      profile_photo: result.info.secure_url,
      profile_thumbnail: result.info.eager[0].secure_url,
    };
    fetch("/api/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user);
      });
  }
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
        console.log("sucess");
        res.json();
      } else {
        console.log("failed");
      }
    });
  }
  function imageLink() {
    if (user) {
     return user?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png";
    } else {
      return currentUser?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png";
    }
  }

  return (
    <IonPage className="profile-page">
      {/* <NavBar /> */}
      <IonContent class="profile-page-content">
        <div className="profile-content">
          <div className="profile-data">
            <div className="image-container">
              <img className="profile-image" src={imageLink()} />
              <CloudinaryUpload
                user={user}
                preset="nn7aqzhz"
                buttonText="Upload"
                handleUpload={handleUpload}
              />
              {user ? null : (
                <IonButton
                  onClick={() => setEditing(!editing)}
                  className="edit-profile-btn"
                >
                  edit profile
                </IonButton>
              )}
            </div>

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
                  <IonLabel>Fitness Level</IonLabel>
                  <IonSelect
                    value={fitness}
                    placeholder="Select One"
                    onIonChange={(e) => setFitness(e.detail.value)}
                  >
                    <IonSelectOption value="Beginner">Beginner</IonSelectOption>
                    <IonSelectOption value="Intermediate">
                      Intermediate
                    </IonSelectOption>
                    <IonSelectOption value="Advanced">Advanced</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <ion-label>Height</ion-label>
                  <IonInput
                    onIonChange={(e) =>
                      setHeight({ ...height, ft: e.target.value })
                    }
                    placeholder="ft"
                    type="number"
                  ></IonInput>
                  <IonInput
                    onIonChange={(e) =>
                      setHeight({ ...height, inches: e.target.value })
                    }
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
            ) : (
              <IonCardHeader>
                <IonCardTitle>
                  {user
                    ? user.profile.first_name
                    : currentUser?.profile.first_name}
                  {user
                    ? user.profile.last_name
                    : currentUser?.profile.last_name}
                </IonCardTitle>
                <IonCardSubtitle>Date Joined: {dateJoined()}</IonCardSubtitle>
                <IonCardSubtitle>followers/following</IonCardSubtitle>
              </IonCardHeader>
            )}

            <div>{renderWorkouts(sortUsers())}</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

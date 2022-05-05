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
import { useAuth } from "../components/contexts/AuthContext";
import CloudinaryUpload from "../components/CloudinaryUpload";
import RenderWorkouts from "../components/RenderWorkouts";
import EditProfileForm from "../components/EditProfileForm";

const Profile = ({ user, currentUser }) => {
  const { workouts, setCurrentUser } = useAuth();

  const [editing, setEditing] = useState(false);

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

  function imageLink() {
    if (user) {
      return (
        user?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png"
      );
    } else {
      return (
        currentUser?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png"
      );
    }
  }

  return (
    <IonPage className="">
      <IonContent class="">
        <IonGrid className="grid">
          <IonRow className="">
            <div className="profile-container">
              <IonCol size-sm className="left-col">
                <IonCard className="profile-card">
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
                      {editing ? "Done" : "Edit Profile"}
                    </IonButton>
                  )}
                  <ion-card-header>
                    <IonCardTitle>
                      {user
                        ? user.profile.first_name
                        : currentUser?.profile.first_name}{" "}
                      {user
                        ? user.profile.last_name
                        : currentUser?.profile.last_name}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      Date Joined: {dateJoined()}
                    </IonCardSubtitle>
                    <IonCardSubtitle>followers/following</IonCardSubtitle>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label>Bio: </ion-label>
                    No Bio Found
                  </ion-card-content>
                </IonCard>

                {editing ? (
                  <EditProfileForm
                    currentUser={currentUser}
                    setEditing={setEditing}
                    setCurrentUser={setCurrentUser}
                  />
                ) : (
                  <IonCardHeader></IonCardHeader>
                )}
              </IonCol>
            </div>
            <div className="user-workouts-container">
              <IonCol className="right-col">
                <RenderWorkouts posts={sortUsers()} />
              </IonCol>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

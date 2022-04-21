import "../theme/Profile.css";
import { NavLink } from "react-router-dom";

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

} from "@ionic/react";

const Profile = () => {
  return (
    <IonPage className="profile-page">
      <IonContent class="profile-page-content">
        <div className="profile-content">
          <div className="image-container">
            <img
              className="image"
              src="https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png"
            />
            <IonButton>upload</IonButton>
            <IonButton className="edit-profile-btn">edit profile</IonButton>

              <IonCardHeader>
                <IonCardTitle>Name</IonCardTitle>
                <IonCardSubtitle>date joined</IonCardSubtitle>
                <IonCardSubtitle>followers/following</IonCardSubtitle>
              </IonCardHeader>
              <IonTitle className="post-title">Posts</IonTitle>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

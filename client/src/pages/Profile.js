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
          <div className="profile-data">
            <div className="image-container">
            
            </div>
            
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

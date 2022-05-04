import "../theme/Home.css";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonList,
  IonLabel,
} from "@ionic/react";
import PostWorkoutForm from "../components/PostWorkoutForm";
import { renderWorkouts } from "../components/Utils";
import { RenderUsers } from "../components/Utils";
import { userImage } from "../components/Utils";
import { useAuth } from "../components/contexts/AuthContext";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

const Home = () => {
  const { workouts, users } = useAuth();

  return (
    <IonPage>
      {/* <IonHeader> */}
        {/* <IonToolbar> */}
          <NavBar />
        {/* </IonToolbar> */}
      {/* </IonHeader> */}

      <IonContent class="home-page-content">
        <IonGrid class="home-grid">
          <IonRow className="row ">
            <IonCol className="">
              <div className="suggested-users-cont">
                <IonTitle>People You Might Like</IonTitle>
                <div className="users-container">
                  <div>{RenderUsers(users)}</div>
                </div>
              </div>
            </IonCol>
            <IonCol className="right-col">
              <div className="home-content">
                <PostWorkoutForm />

                <div className="workout-container">
                  {renderWorkouts(workouts)}
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

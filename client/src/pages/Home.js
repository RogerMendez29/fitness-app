import "../theme/Home.css";
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";

import { useState } from "react";

const Home = () => {
  const [creating, setCreating] = useState(false);
  return (
    <IonPage>
      <IonContent class="home-page-content">
        <div className="home-content">
          <div className="post-container">
            <IonTitle>Home</IonTitle>
            <IonButton
              onClick={() => setCreating(!creating)}
              className="toggle-form"
            >
              Post a Workout
            </IonButton>
            {creating ? (
              <form className="workout-form">
                <IonItem>
                  <IonInput placeholder="Workout name"></IonInput>
                  <IonSelect
                    okText="Okay"
                    cancelText="Dismiss"
                    placeholder="difficulty"
                  >
                    <IonSelectOption value="true">Intermediate</IonSelectOption>
                    <IonSelectOption value="false">easy</IonSelectOption>
                    <IonSelectOption value="false">hard</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonTextarea
                    className="description-box"
                    placeholder="Description:"
                  ></IonTextarea>
                </IonItem>
                <IonButton>Submit</IonButton>
              </form>
            ) : null}
          </div>
          <IonTitle>Users Feed</IonTitle>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import "../theme/Home.css";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
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

import { useState, useEffect } from "react";

const Home = () => {
  const [creating, setCreating] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  function renderWorkouts() {
    const workoutCards = workouts?.map((workout) => {
      if (workout?.workout_exercises?.length > 0) {
        return (
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
              <ion-card-title>{workout.name}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              {workout.workout_exercises?.map((exercise) => {
                return (
                  <IonList>
                    <IonItem>
                      <IonLabel> {exercise.name}</IonLabel>
                      <IonLabel> Sets: {exercise.sets}</IonLabel>
                      <IonLabel> Reps: {exercise.reps}</IonLabel>
                      <IonLabel> Rest: {exercise.rest}</IonLabel>

                      <IonLabel> Weight: {exercise.weight}</IonLabel>
                      <IonLabel> Time: {exercise.time} s</IonLabel>
                      <IonLabel> Distance: {exercise.distance}</IonLabel>
                    </IonItem>
                  </IonList>
                );
              })}
            </ion-card-content>
          </ion-card>
        );
      } else {
        return null;
      }
    });
    return workoutCards;
  }


  return (
    <IonPage>
      <IonContent class="home-page-content">
        <IonGrid class="home-grid">
          <IonRow className="row ">
            <IonCol className="left-col ion-align-items-end">
              <div className="suggested-users-cont">suggested Users</div>
            </IonCol>
            <IonCol className="right-col">
              <div className="home-content">
                <div className="post-container">
                  <IonTitle>Home</IonTitle>
                  <IonButton
                    onClick={() => {
                      setCreating(!creating);
                      console.log(creating);
                    }}
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
                          <IonSelectOption value="true">
                            Intermediate
                          </IonSelectOption>
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
                <div className="workout-container">{renderWorkouts()}</div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

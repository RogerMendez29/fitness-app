import { IonLabel, IonList, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import "../theme/Utils.css";

function RenderWorkouts({posts}) {
  // const unwantedKeys = ["id", "workout_id", "exercise_id"];
  const { workouts, setWorkouts, setWorkoutExercises, workoutExercises } =
    useAuth();


  function handleDelete(id) {
    fetch(`/api/workouts/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        setWorkouts(workouts.filter((posts) => posts.id !== id));
      }
    });
  }

  const workoutCards = posts?.map((workout) => {
    if (workout.workout_exercises?.length > 0) {
      return (
        <ion-card key={workout.id}>
          <ion-card-header>
            <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
            <ion-card-title>{workout.name}</ion-card-title>
          </ion-card-header>
          <IonButton
            onClick={() => handleDelete(workout.id)}
            className="delete-btn"
            color="danger"
          >
            Delete
          </IonButton>
          <ion-card-content>
            <IonList>
              {workout.workout_exercises?.map((exercise) => {
                return (
                  <IonList key={exercise.id}>
                    <IonItem>
                      <IonLabel> {exercise.name}</IonLabel>
                      {exercise.sets ? (
                        <IonLabel> Sets: {exercise.sets}</IonLabel>
                      ) : null}
                      {exercise.reps ? (
                        <IonLabel> Reps: {exercise.reps}</IonLabel>
                      ) : null}
                      {exercise.rest ? (
                        <IonLabel> Rest: {exercise.rest}s</IonLabel>
                      ) : null}

                      {exercise.weight ? (
                        <IonLabel> Weight: {exercise.weight} Ibs</IonLabel>
                      ) : null}
                      {exercise.time ? (
                        <IonLabel> Time: {exercise.time}minutes</IonLabel>
                      ) : null}
                      {exercise.distance ? (
                        <IonLabel> Distance: {exercise.distance}miles</IonLabel>
                      ) : null}
                    </IonItem>
                  </IonList>
                );
              })}
            </IonList>
          </ion-card-content>
        </ion-card>
      );
    } else {
      return null;
    }
  });
  return workoutCards;
}

export default RenderWorkouts

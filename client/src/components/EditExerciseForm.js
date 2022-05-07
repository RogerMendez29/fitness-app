import "../theme/Profile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  IonButton,
  IonTitle,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";

function EditExerciseForm({
  editableExercise,
  setEditableExercise,
  postedExercise,
  setEditingExercise,
  setWorkoutExercises,
}) {
  const { workoutExercises, setWorkouts } = useAuth();

  const [exercise, setExercise] = useState({
    sets: postedExercise.sets,
    reps: postedExercise.reps,
    weight: postedExercise.weight,
    time: postedExercise.time,
    distance: postedExercise.distance,
    rest: postedExercise.rest,
  });

  function handleSubmit(e) {
    e.preventDefault();
    setEditingExercise(false);

    fetch(`/api/workout_exercises/${postedExercise.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        time: exercise.time,
        distance: exercise.distance,
        rest: exercise.rest,
      }),
    }).then((res) => {
      if (res.ok) {
        // editableExercise.removeAll();
        setEditableExercise(new Set());
        res.json().then((data) => {});
        fetch("/api/workouts")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setWorkouts(data);
          });
      } else {
      }
    });
  }
  console.log(editableExercise);

  return (
    <form className="" onSubmit={handleSubmit}>
      <IonTitle>{postedExercise.name}</IonTitle>
      <IonList key={postedExercise.id}>
        <IonItem>
          <ion-label>Sets</ion-label>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, sets: e.target.value })
            }
            value={exercise.sets}
            placeholder="Sets"
            type="number"
          ></IonInput>
          <ion-label>Reps</ion-label>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, reps: e.target.value })
            }
            value={exercise.reps}
            placeholder=""
            type="number"
          ></IonInput>
          <ion-label>Rest</ion-label>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, rest: e.target.value })
            }
            value={exercise.rest}
            placeholder=""
            type="number"
          ></IonInput>
          <IonLabel>Weight</IonLabel>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, weight: e.target.value })
            }
            value={exercise.weight}
            placeholder=""
            type="number"
          ></IonInput>
          <ion-label>Time</ion-label>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, time: e.target.value })
            }
            value={exercise.time}
            placeholder=""
            type="number"
          ></IonInput>
          <ion-label>Distance</ion-label>
          <IonInput
            onIonChange={(e) =>
              setExercise({ ...exercise, distance: e.target.value })
            }
            value={exercise.distance}
            placeholder=""
            type="number"
          ></IonInput>

          <IonButton type="submit">Submit</IonButton>
        </IonItem>
      </IonList>
    </form>
  );
}

export default EditExerciseForm;

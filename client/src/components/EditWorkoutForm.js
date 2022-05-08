import "../theme/Profile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  IonButton,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";

function EditWorkoutForm({ post, setEditingWorkout, setEditableWorkout }) {
  const { workouts, setWorkouts } = useAuth();
  const [workout, setWorkout] = useState({
    title: post.name,
    difficulty: post.difficulty,
    description: post.description,
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/workouts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: workout.title,
        difficulty: workout.difficulty,
        description: workout.description,
      }),
    }).then((res) => {
      if (res.ok) {
        setEditableWorkout(new Set());

        setEditingWorkout(false);
        res.json().then((data) => {
          let updated = workouts.filter((workout) => workout.id !== data.id);
          setWorkouts([...updated, data]);
        });
      } else {
        console.log(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <IonItem>
        <IonInput
          value={workout.title}
          onIonChange={(e) => setWorkout({ ...workout, title: e.target.value })}
          placeholder="Title"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonSelect
          value={workout.difficulty}
          onIonChange={(e) =>
            setWorkout({ ...workout, difficulty: e.target.value })
          }
          okText="Okay"
          cancelText="Dismiss"
          placeholder="difficulty"
        >
          <IonSelectOption value="Intermediate">Intermediate</IonSelectOption>
          <IonSelectOption value="easy">easy</IonSelectOption>
          <IonSelectOption value="hard">hard</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonTextarea
          value={workout.description}
          onIonChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
          className="description-box"
          placeholder="Description"
        ></IonTextarea>
      </IonItem>

      <IonButton type="submit">Submit</IonButton>
    </form>
  );
}

export default EditWorkoutForm;

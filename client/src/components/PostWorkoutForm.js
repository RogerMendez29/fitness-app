import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonTitle,
  IonSelectOption,
  IonSelect,
  IonTextarea,
} from "@ionic/react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useAuth } from "./contexts/AuthContext";

const PostWorkoutForm = () => {
  const { currentUser } = useAuth();
  const [exerciseId, setExerciseId] = useState();
  const [workoutId, setWorkoutId] = useState();
  const [wordEntered, setWordEntered] = useState("");
  const [creating, setCreating] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [exercises, setExercises] = useState([]);

  let exercisesContainer;

  function postWorkout(event) {
    event.preventDefault();
    fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: workoutName,
        difficulty: difficulty,
        user_id: currentUser.id,
        description: description,
      }),
    }).then((res) => {
      if (res.ok) {
        setCreatingExercise(!creatingExercise);
        setCreating(!creating);
        console.log("success");

        res.json().then((data) => setWorkoutId(data.id));
      } else {
        console.log("failed");
      }
    });
  }

  function renderPostBtn() {
    if (!creatingExercise && !creating) {
      return (
        <IonButton
          onClick={() => {
            setCreating(!creating);
          }}
          className="toggle-form"
        >
          Post a Workout
        </IonButton>
      );
    } else {
      return (
        <IonButton color="success"
          onClick={() => {
            setCreating(false);
            setCreatingExercise(false)
          }}
          className="toggle-form"
        >
          Done
        </IonButton>
      );
    }
  }

  function addExercise() {
    createExerciseObj();
  }

  function createExerciseObj() {
    let obj = {};
    let exerciseInfo = exercisesContainer.querySelectorAll("ion-item");
    exerciseInfo.forEach((e) => {
      let label = e.querySelector("ion-label")?.innerHTML;
      obj[label] = e.querySelector("ion-input")?.value;
    });
    setExercises([...exercises, obj]);
  }

  function post(e) {
    e.preventDefault();

    exercises.map((exercise) => {
      fetch("/api/workout_exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workout_id: workoutId,
          exercise_id: exerciseId,
          sets: exercise.Sets,
          reps: exercise.Reps,
          weight: exercise.Weight ,
          time: exercise.Time,
          distance: exercise.distance,
          rest: exercise.Rest,
        }),
      });
    });
  }

  return (
    <div className="post-container">
      <IonTitle>Home</IonTitle>
      {renderPostBtn()}

      {creating ? (
        <form onSubmit={postWorkout} className="workout-form">
          <IonItem>
            <IonInput
              value={workoutName}
              onIonChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Workout name"
            ></IonInput>
            <IonSelect
              value={difficulty}
              onIonChange={(e) => setDifficulty(e.target.value)}
              okText="Okay"
              cancelText="Dismiss"
              placeholder="difficulty"
            >
              <IonSelectOption value="Intermediate">
                Intermediate
              </IonSelectOption>
              <IonSelectOption value="easy">easy</IonSelectOption>
              <IonSelectOption value="hard">hard</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.target.value)}
              className="description-box"
              placeholder="Description:"
            ></IonTextarea>
          </IonItem>
          <IonButton type="submit">add Exercises</IonButton>
        </form>
      ) : null}

      {creatingExercise ? (
        <div id="exercises" ref={(el) => (exercisesContainer = el)}>
          <form className="workout-form" onSubmit={post}>
            <SearchBar
              exerciseId={exerciseId}
              setExerciseId={setExerciseId}
              wordEntered={wordEntered}
              setWordEntered={setWordEntered}
            />

            <ion-item>
              <ion-label>Sets</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Reps</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Weight</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Time</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>distance</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Rest</ion-label>
              <ion-input placeholder="" type="number"></ion-input>
            </ion-item>

            <IonButton
              color="success"
              onClick={() => {
                addExercise();
                setWordEntered("");
              }}
            >
              Add More
            </IonButton>

            <IonButton type="submit">Post</IonButton>
          </form>
          {exercises.map((exercise) => (
            <ion-item key={exercise.id}>
              <ion-label>{Object.keys(exercise)[0]}</ion-label>
            </ion-item>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostWorkoutForm;

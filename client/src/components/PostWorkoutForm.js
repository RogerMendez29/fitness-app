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

const PostWorkoutForm = ({ currentUser }) => {
  const [creating, setCreating] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [exercises, setExercises] = useState();

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
        console.log("sucess");

        res.json();
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
    }
  }

  function addExercise() {
    createExerciseObj();
  }

  function createExerciseObj() {
    let obj = {};
    let exercises = exercisesContainer.querySelectorAll("ion-item");
    exercises.forEach((e) => {
      let label = e.querySelector("ion-label")?.innerHTML;
      obj[label] = e.querySelector("ion-input").value;
    });

    setExercises([...obj]);
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
              <IonSelectOption value="true">Intermediate</IonSelectOption>
              <IonSelectOption value="false">easy</IonSelectOption>
              <IonSelectOption value="false">hard</IonSelectOption>
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
          <form className="workout-form">
            <ion-searchbar></ion-searchbar>
            <ion-item>
              <ion-label>Exercise name</ion-label>

              <ion-input></ion-input>
            </ion-item>
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
            <IonButton color="success" type="submit">
              Add More
            </IonButton>
            <IonButton
              color="success"
              onClick={() => {
                addExercise();
              }}
            >
              Add More 2
            </IonButton>

            <IonButton type="submit">Post</IonButton>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default PostWorkoutForm;

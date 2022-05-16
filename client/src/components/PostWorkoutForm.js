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
import "../theme/PostWorkout.css";

const PostWorkoutForm = () => {
  const {
    currentUser,
    setCurrentUser,
    workouts,
    setWorkouts,
    workoutExercises,
    setWorkoutExercises,
  } = useAuth();
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
    setCreatingExercise(!creatingExercise);
    setCreating(!creating);
  }

  function addExercise() {
    createExerciseObj();
  }

  // console.log(exercises[0].enteredWord);

  // let first = exercises[0]

  

  function createExerciseObj() {
    let obj = { id: exerciseId, enteredWord: wordEntered };


    let exerciseInfo = exercisesContainer.querySelectorAll("ion-item");
    exerciseInfo.forEach((e) => {
      let label = e.querySelector("ion-label")?.innerHTML;
      obj[label] = e.querySelector("ion-input")?.value;
    });
    setExercises([...exercises, obj]);
  }

  function post(e) {
    e.preventDefault();
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
        setWorkoutName("");
        setDifficulty("");
        setDescription("");

        res.json().then((data) => {
          setWorkoutId(data.id);
          setWorkouts([...workouts, data]);
          exercises.map((exercise) => {
            console.log(exercise);

            fetch("/api/workout_exercises", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                workout_id: data.id,
                exercise_id: exercise.id,
                sets: exercise.Sets,
                reps: exercise.Reps,
                weight: exercise.Weight,
                time: exercise.Time,
                distance: exercise.Distance,
                rest: exercise.Rest,
              }),
            }).then((res) => {
              if (res.ok) {
                setExercises([]);
                setCreating(false);
                setCreatingExercise(false);
                res.json().then((data) => {
                  setWorkoutExercises([...workoutExercises, data]);

                  fetch("/api/workouts")
                    .then((res) => res.json())
                    .then((data) => {
                      setWorkouts(data);
                    });
                  setWorkouts([{ ...workouts, data }]);

                  fetch("/api/me").then((res) => {
                    if (res.ok) {
                      res.json().then((user) => {
                        setCurrentUser(user);
                      });
                    }
                  });
                });
              }
            });
          });
        });
      }
    });
  }

  return (
    <div className="post-container">
      {!creatingExercise ? (
        <form onSubmit={postWorkout} className="workout-form">
          <IonItem>
            <IonInput
              value={workoutName}
              onIonChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Create A Workout"
              required
            ></IonInput>
            <IonSelect
              value={difficulty}
              onIonChange={(e) => setDifficulty(e.target.value)}
              okText="Okay"
              cancelText="Dismiss"
              placeholder="Difficulty"
              required
            >
              <IonSelectOption value="Easy">Easy</IonSelectOption>
              <IonSelectOption value="Intermediate">
                Intermediate
              </IonSelectOption>
              <IonSelectOption value="Hard">Hard</IonSelectOption>
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
          <IonButton
            color="dark"
            size="small"
            style={{ textTransform: "none" }}
            type="submit"
          >
            Add Exercises
          </IonButton>
        </form>
      ) : null}

      {creatingExercise ? (
        <div id="exercises">
          <form className="workout-form" onSubmit={post}>
            <SearchBar
              exerciseId={exerciseId}
              setExerciseId={setExerciseId}
              wordEntered={wordEntered}
              setWordEntered={setWordEntered}
            />
            <div ref={(el) => (exercisesContainer = el)}>
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
                <ion-label>Distance</ion-label>
                <ion-input placeholder="" type="number"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Rest</ion-label>
                <ion-input placeholder="" type="number"></ion-input>
              </ion-item>
            </div>

            <IonButton
              color="success"
              onClick={() => {
                addExercise();
                setWordEntered("");
              }}
            >
              Add
            </IonButton>

            <IonButton type="submit">Post</IonButton>
          </form>
          <IonTitle
            style={{
              marginBottom: "1rem",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Exercises Added:
          </IonTitle>
          {exercises.map((exercise) => (
            <ion-item key={exercise.id}>
              <ion-label key={exercise.id + 1}>
                : {exercise.enteredWord}
              </ion-label>
            </ion-item>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostWorkoutForm;

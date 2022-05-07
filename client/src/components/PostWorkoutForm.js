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
        <IonButton
          color="success"
          onClick={() => {
            setCreating(false);
            setCreatingExercise(false);
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
    let obj = { id: exerciseId };
    let exerciseInfo = exercisesContainer.querySelectorAll("ion-item");
    exerciseInfo.forEach((e) => {
      let label = e.querySelector("ion-label")?.innerHTML;
      obj[label] = e.querySelector("ion-input")?.value;
      // let id = exerciseId;
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

        res.json().then((data) => {
          setWorkoutId(data.id);
          setWorkouts([...workouts, data]);
          exercises.map((exercise) => {
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
                distance: exercise.distance,
                rest: exercise.Rest,
              }),
            }).then((res) => {
              if (res.ok) {
                setExercises([]);
                setCreating(false);
                setCreatingExercise(false);
                res.json().then((data) => {
                  setWorkoutExercises([...workoutExercises, data]);
                  console.log(data);

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
              Add
            </IonButton>

            <IonButton type="submit">Post</IonButton>
          </form>
          <IonTitle>Exercises Added:</IonTitle>
          {exercises.map((exercise) => (
            <ion-item key={Object.keys(exercise)[1]}>
              <ion-label key={exercise.id}>
                {Object.keys(exercise)[1]}
              </ion-label>
            </ion-item>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostWorkoutForm;

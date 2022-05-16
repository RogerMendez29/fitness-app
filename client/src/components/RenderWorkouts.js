import {
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonTitle,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonText,
} from "@ionic/react";
import { chatbox } from "ionicons/icons";

import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import EditWorkoutForm from "./EditWorkoutForm";
import EditExerciseForm from "./EditExerciseForm";
import ModalBody from "./ModalBody";
import CommentBox from "./CommentBox";
import "../theme/WorkoutCard.css";

function RenderWorkouts({ posts, setPosts, canModify, setUser }) {
  const [editableWorkout, setEditableWorkout] = useState(new Set());
  const [editableExercise, setEditableExercise] = useState(new Set());
  const [openComment, setOpenComment] = useState(new Set());
  const { workouts, setWorkouts, setCurrentUser, currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(false);
  const [editingExercise, setEditingExercise] = useState(false);
  const [exerciseId, setExerciseId] = useState();

  const closeModal = () => {
    setOpen(false);
  };

  let history = useHistory();
  let location = useLocation();

  function navToUserPage(id) {
    setUser(null);
    history.push(`/user_page/${id}`);

    fetch(`/api/user_page/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }

  function handleEdit(id) {
    if (editableWorkout.has(id)) {
      editableWorkout.delete(id);
    } else {
      editableWorkout.add(id);
    }
    setEditableWorkout(new Set([...editableWorkout]));
  }

  function handleEditExercise(id) {
    if (editableExercise.has(id)) {
      editableExercise.delete(id);
    } else {
      editableExercise.add(id);
    }
    setEditableExercise(new Set([...editableExercise]));
  }

  function handleShowBox(id) {
    if (openComment.has(id)) {
      openComment.delete(id);
    } else {
      openComment.add(id);
    }
    setOpenComment(new Set([...openComment]));
  }

  function userImage(workout) {
    return workout.thumbnail_url ? (
      <IonAvatar style={{ display: "inline", marginRight: "10px" }}>
        <img
          style={{ display: "inline", marginRight: "20px" }}
          className="comment-image"
          src={workout.thumbnail_url}
          onClick={() => navToUserPage(workout.user_id)}
        />
      </IonAvatar>
    ) : (
      <IonAvatar>
        <svg
          onClick={() => navToUserPage(workout.user_id)}
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Person Circle</title>
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
        </svg>
      </IonAvatar>
    );
  }

  function handleDelete(id) {
    fetch(`/api/workouts/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        let updated = workouts.filter((posts) => posts.id !== id);
        setWorkouts(updated);
        setCurrentUser({ ...currentUser, workouts: updated });
      }
    });
  }

  const difficultyColor = (value) => {
    if (value === "Intermediate") {
      return "blue";
    } else if (value === "Easy") {
      return "green";
    } else {
      return "red";
    }
  };

  const workoutCards = posts?.map((workout) => {

    if (workout.workout_exercises?.length > 0) {
      return (
        <IonCard key={workout.id} className="workout-card">
          <div className="workout-card-content">
            <IonCardHeader className="workout-card-header">
              <div
                className="workout-card-header"
                style={{ fontWeight: "bold" }}
              >
                {userImage(workout)}{" "}
                <div style={{ marginTop: "1rem" }}> {workout.posted_by}</div>
                <IonTitle
                  color="dark"
                  style={{
                    marginLeft: "5.25rem",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  {workout.name}{" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginLeft: "3.25rem",
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: difficultyColor(workout.difficulty),
                    }}
                  >
                    {workout.difficulty}
                  </div>
                </IonTitle>
              </div>
            </IonCardHeader>
            <IonText color="dark">
              <p
                style={{ color: "grey", marginLeft: "4.8rem", marginTop: "0" }}
              >
                {workout.description}
              </p>
            </IonText>

            {canModify || workout.user_id === currentUser.id ? (
              <div>
                <IonButton
                  onClick={() => handleDelete(workout.id)}
                  className="delete-btn"
                  color="dark"
                  size="small"
                >
                  Delete
                </IonButton>
                <IonButton
                  onClick={() => handleEdit(workout.id)}
                  color="dark"
                  size="small"
                  className="edit-btn"
                >
                  {editableWorkout.has(workout.id) ? "Done" : "Edit"}
                </IonButton>
              </div>
            ) : null}

            {editableWorkout.has(workout.id) ? (
              <EditWorkoutForm
                setEditableWorkout={setEditableWorkout}
                post={workout}
                setEditingWorkout={setEditingWorkout}
              />
            ) : null}
            <IonModal
              isOpen={open}
              onDismiss={closeModal}
              breakpoints={[0, 0.2, 0.5, 0.7]}
              initialBreakpoint={0.7}
              backdropBreakpoint={0.2}
            >
              <ModalBody setOpen={setOpen} id={exerciseId} />
            </IonModal>

            <ion-card-content style={{ paddingBottom: "0" }}>
              <IonList>
                {workout.workout_exercises?.map((exercise) => {
                  return editableExercise.has(exercise.id) ? (
                    <EditExerciseForm
                      setEditableExercise={setEditableExercise}
                      editableExercise={editableExercise}
                      key={exercise.id}
                      setEditingExercise={setEditingExercise}
                      postedExercise={exercise}
                    />
                  ) : (
                    <div key={exercise.id}>
                      <IonTitle
                        className="exercise-title"
                        color="dark"
                        onClick={() => {
                          setExerciseId(exercise.exercise_id);
                          setOpen(!open);
                        }}
                      >
                        {exercise.name}
                      </IonTitle>
                      <IonItem key={exercise.id}>
                        {exercise.sets ? (
                          <IonLabel className="workout-label"> Sets: {exercise.sets}</IonLabel>
                        ) : null}
                        {exercise.reps ? (
                          <IonLabel className="workout-label" > Reps: {exercise.reps}</IonLabel>
                        ) : null}
                        {exercise.rest ? (
                          <IonLabel className="workout-label"> Rest: {exercise.rest}s</IonLabel>
                        ) : null}

                        {exercise.weight ? (
                          <IonLabel> Weight: {exercise.weight} Ibs</IonLabel>
                        ) : null}
                        {exercise.time ? (
                          <IonLabel className="workout-label" > Time: {exercise.time} Minutes</IonLabel>
                        ) : null}
                        {exercise.distance ? (
                          <IonLabel  className="workout-label" >
                            {" "}
                            Distance: {exercise.distance} Miles
                          </IonLabel>
                        ) : null}
                        {canModify || workout.user_id === currentUser.id ? (
                          <IonButton
                            onClick={() => handleEditExercise(exercise.id)}
                            color="dark"
                          >
                            {editableExercise.has(workout.id) ? "Done" : "Edit"}
                          </IonButton>
                        ) : null}
                      </IonItem>
                    </div>
                  );
                })}
              </IonList>
            </ion-card-content>
            <IonTitle
              className="comment-title"
              style={{
                cursor: "pointer",
                width: "fit-content",
                margin: ".5rem",
                marginTop: "0",
              }}
              onClick={() => handleShowBox(workout.id)}
            >
              <IonIcon className="comment-icon" icon={chatbox}></IonIcon>
              Comment
            </IonTitle>

            {openComment.has(workout.id) ? (
              <CommentBox
                navToUserPage={navToUserPage}
                workouts={workouts}
                setWorkouts={setWorkouts}
                workoutId={workout.id}
                userId={currentUser.id}
                comments={workout.comments}
                setOpenComment={setOpenComment}
              />
            ) : null}
          </div>
        </IonCard>
      );
    } else {
      return null;
    }
  });

  if (posts.length > 0) {
    return workoutCards;
  } else if (location.pathname === "/home") {
    return (
      <IonTitle style={{ margin: "15%" }}>
        Follow Users to Increase Your Feed
      </IonTitle>
    );
  } else {
    return (
      <IonTitle style={{ margin: "15%", textAlign: "center" }}>
       No Posts Available
      </IonTitle>
    );
  }
}

export default RenderWorkouts;

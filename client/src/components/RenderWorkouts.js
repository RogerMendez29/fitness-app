import {
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonTitle,
  IonIcon,
  IonCard,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import "../theme/Utils.css";
import EditWorkoutForm from "./EditWorkoutForm";
import EditProfileForm from "./EditWorkoutForm";
import EditExerciseForm from "./EditExerciseForm";
import ModalBody from "./ModalBody";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import CommentBox from "./CommentBox";

function RenderWorkouts({ posts, setPosts, canModify }) {
  const [editableWorkout, setEditableWorkout] = useState(new Set());
  const [editableExercise, setEditableExercise] = useState(new Set());
  const [openComment, setOpenComment] = useState(new Set());

  const [open, setOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(false);
  const [editingExercise, setEditingExercise] = useState(false);
  const [exerciseId, setExerciseId] = useState();

  const closeModal = () => {
    setOpen(false);
  };

  const { workouts, setWorkouts, setCurrentUser, currentUser } = useAuth();

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
      <IonAvatar>
        <img
          className="comment-image"
          src={workout.thumbnail_url}
          //   onClick={() => navToUserPage(user.id)}
        />
      </IonAvatar>
    ) : (
      <IonAvatar>
        <svg
          //   onClick={() => navToUserPage(user.id)}
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
        console.log("success");

        let updated = workouts.filter((posts) => posts.id !== id);
        setWorkouts(updated);
        setCurrentUser({ ...currentUser, workouts: updated });
      }
    });
  }

  const workoutCards = posts?.map((workout) => {
    if (workout.workout_exercises?.length > 0) {
      return (
        <ion-card key={workout.id}>
          <ion-card-header>
            {userImage(workout)}
            <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
            <ion-card-title>
              {workout.name} •{" "}
              <h6 style={{ color: "green", display: "inline" }}>
                {workout.difficulty}
              </h6>
            </ion-card-title>
            <ion-text color="dark">
              <h3 style={{ color: "grey" }}>{workout.description}</h3>
            </ion-text>
          </ion-card-header>

          {canModify || workout.user_id === currentUser.id ? (
            <div>
              <IonButton
                onClick={() => handleDelete(workout.id)}
                className="delete-btn"
                color="danger"
              >
                Delete
              </IonButton>
              <IonButton
                onClick={() => handleEdit(workout.id)}
                color="success"
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

          <ion-card-content>
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
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setExerciseId(exercise.exercise_id);
                        setOpen(!open);
                      }}
                    >
                      {exercise.name}
                    </IonTitle>
                    <IonItem key={exercise.id}>
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
                      {canModify || workout.user_id === currentUser.id ? (
                        <IonButton
                          onClick={() => handleEditExercise(exercise.id)}
                          color="success"
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
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => handleShowBox(workout.id)}
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            // className="comment-icon"
            viewBox="0 0 512 512"
          >
            <title>Ellipsis Horizontal</title>
            <circle
              cx="256"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <circle
              cx="416"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <circle
              cx="96"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </svg>
          {openComment.has(workout.id) ? (
            <CommentBox
              workouts={workouts}
              setWorkouts={setWorkouts}
              workoutId={workout.id}
              userId={currentUser.id}
              comments={workout.comments}
              setOpenComment={setOpenComment}
            />
          ) : null}
        </ion-card>
      );
    } else {
      return null;
    }
  });

  if (posts.length > 0) {
    return workoutCards;
  } else {
    return (
      <IonTitle style={{ margin: "15%" }}>
        Follow Users to Increase Your Feed
      </IonTitle>
    );
  }
}

export default RenderWorkouts;

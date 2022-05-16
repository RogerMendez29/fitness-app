import {
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonTitle,
  IonIcon,
  IonCard,
  IonTextarea,
  IonPage,
} from "@ionic/react";
import { home, trash } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import EditWorkoutForm from "./EditWorkoutForm";
import EditProfileForm from "./EditWorkoutForm";
import EditExerciseForm from "./EditExerciseForm";
import ModalBody from "./ModalBody";

function CommentCard({ comment, navToUserPage, setPosts, posts }) {
  const { currentUser, setWorkouts } = useAuth();

  console.log(posts);

  const handleDelete = () => {
    fetch(`api/comments/${comment.id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== comment.id));
      }
    });
  };
  function userImage(comment) {
    return comment.thumbnail_url ? (
      <IonAvatar>
        <img
          className="comment-image"
          src={comment.thumbnail_url}
          onClick={() => navToUserPage(comment.user_id)}
        />
      </IonAvatar>
    ) : (
      <IonAvatar>
        <svg
          onClick={() => navToUserPage(comment.user_id)}
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

  return (
    <IonCard className="comment-card">
      <ion-subtitle
        style={{
          bottom: "0",
          right: "7%",
          position: "absolute",
          marginRight: "1rem",
        }}
      >
        {comment.created_date}{" "}
      </ion-subtitle>
      <ion-subtitle
        style={{
          bottom: "0",
          right: "0",
          position: "absolute",
          marginRight: ".5rem",
        }}
      >
        {comment.created_time}
      </ion-subtitle>
      <div className="comment-card-content" style={{ display: "inline" }}>
        {userImage(comment)}

        <ion-subtitle style={{ fontWeight: "bold" }}>
          {comment.full_name}:
        </ion-subtitle>
      </div>

      <ion-text>{comment.comment}</ion-text>
      {currentUser.id === comment.user_id || currentUser.user_can_modify ? (
        <IonIcon
          onClick={handleDelete}
          style={{
            cursor: "pointer",
            top: "0",
            right: "0",
            position: "absolute",
            margin: ".7rem",
          }}
          icon={trash}
        ></IonIcon>
      ) : null}
    </IonCard>
  );
}

export default CommentCard;

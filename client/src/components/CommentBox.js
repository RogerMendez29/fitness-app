import {
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonTitle,
  IonIcon,
  IonCard,
  IonTextarea,
  IonContent,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import "../theme/Utils.css";
import EditWorkoutForm from "./EditWorkoutForm";
import EditProfileForm from "./EditWorkoutForm";
import EditExerciseForm from "./EditExerciseForm";
import ModalBody from "./ModalBody";
import CommentCard from "./CommentCard";

function CommentBox({
  userId,
  workoutId,
  comments,
  setOpenComment,
  setWorkouts,
}) {
  const [user, setUser] = useState();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState(comments);

  useEffect(() => {
    return setPosts(comments);
  }, []);

  const handleComment = (e) => {
    e.preventDefault();

    fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        workout_id: workoutId,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setOpenComment(new Set());
        setPosts([...posts, data]);
        setComment("")
      });
    //   .then(
    //     fetch("/api/workouts")
    //       .then((res) => res.json())
    //       .then((data) => setWorkouts(data))
    //   );
  };

  return (
    <div>
      <ion-list className="comments">
        <div className="comments">
          {posts.map((comment) => {
            return <CommentCard key={comment.id} comment={comment} />;
          })}
        </div>
      </ion-list>

      

      <IonCard>
        <IonItem>
          <form onSubmit={(e) => handleComment(e)}>
            <IonTextarea
              value={comment}
              onIonChange={(e) => setComment(e.target.value)}
              className="description-box"
              placeholder="Comment"
            ></IonTextarea>
            <IonButton type="submit">Submit</IonButton>
          </form>
        </IonItem>
      </IonCard>
    </div>
  );
}

export default CommentBox;

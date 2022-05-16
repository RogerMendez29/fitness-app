import {
  IonList,
  IonItem,
  IonCard,
  IonTextarea,
  IonCardContent,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import CommentCard from "./CommentCard";
import "../theme/CommentBox.css";

function CommentBox({ navToUserPage, userId, workoutId, comments }) {
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
        setPosts([...posts, data]);
        setComment("");
      });
  };

  return (
    <div className="comment-box">
      <IonList className="comments-list">
        <div className="comments">
          {posts.map((comment) => {
            return (
              <CommentCard
              posts={posts}
                setPosts={setPosts}
                key={comment.id}
                navToUserPage={navToUserPage}
                comment={comment}
              />
            );
          })}
        </div>
      </IonList>

      <IonCard className="comment-card" style={{ marginTop: "0" }}>
        <IonCardContent style={{ marginTop: "0" }}>
          <IonItem style={{ marginTop: "0" }}>
            <form style={{ marginTop: "0" }} onSubmit={(e) => handleComment(e)}>
              <IonTextarea
                value={comment}
                onIonChange={(e) => setComment(e.target.value)}
                className="description-box"
                placeholder="Comment"
              ></IonTextarea>
              <IonButton type="submit">Submit</IonButton>
            </form>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default CommentBox;

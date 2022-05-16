import React, { useRef, useState, useEffect } from "react";
import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useAuth } from "./contexts/AuthContext";
import "../theme/ModalBody.css";

const PostExerciseModal = ({ setOpen }) => {
  const { exercises, setExercises } = useAuth();
  const [exercise, setExercise] = useState({
    name: "",
    target: "",
    bodyPart: "",
    equipment: "",
    gif: "",
  });

  const handlePost = (e) => {
    e.preventDefault();

    fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: exercise.name,
        target: exercise.target,
        bodypart: exercise.bodyPart,
        gif_url: exercise.gif,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setOpen(false);
          setExercises([...exercises, data]);
        });
      } else {
        console.log("failed");
      }
    });
  };

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{
              marginLeft: "5rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Exercise Form
          </IonTitle>
          <IonButton
            onClick={() => setOpen(false)}
            slot="end"
            color="dark"
            style={{ textTransform: "none" }}
          >
            Close
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonCard style={{ margin: "1rem", textAlign: "center" }}>
        <form onSubmit={(e) => handlePost(e)}>
          <IonItem>
            <IonInput
              required
              placeholder="Name"
              onIonChange={(e) =>
                setExercise({ ...exercise, name: e.target.value })
              }
              value={exercise.name}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              placeholder="Target"
              onIonChange={(e) =>
                setExercise({ ...exercise, target: e.target.value })
              }
              value={exercise.target}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              placeholder="Body Part"
              onIonChange={(e) =>
                setExercise({ ...exercise, bodyPart: e.target.value })
              }
              value={exercise.bodyPart}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              placeholder="Equipment"
              onIonChange={(e) =>
                setExercise({ ...exercise, equipment: e.target.value })
              }
              value={exercise.equipment}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Gif Url"
              onIonChange={(e) =>
                setExercise({ ...exercise, gif: e.target.value })
              }
              value={exercise.gif}
            ></IonInput>
          </IonItem>

          <IonButton
            type="submit"
            color="dark"
            style={{ textTransform: "none" }}
          >
            Add
          </IonButton>
        </form>
      </IonCard>
    </div>
  );
};

export default PostExerciseModal;

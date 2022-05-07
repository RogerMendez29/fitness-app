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
// import "../theme/LoginForm.css";

function ModalBody({ setOpen, id }) {
  const [exercise, setExercise] = useState();

  useEffect(() => {
    fetch(`/api/exercises/${id}`).then((res) => {
      res.json().then((data) => {
        setExercise(data);
      });
    });
  }, []);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{exercise ? exercise?.name : null}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <img
              src={exercise ? exercise?.gif_url : null}
              // rel:animated_src="./example1.gif"
              width="360"
              height="360"
              // rel:auto_play="1"
              // rel:rubbable="1"
            />
          </IonCol>
          <IonCol>
            <IonTitle style={{margin: "15px"}}>Target: {exercise?.target}</IonTitle>
            <IonTitle style={{margin: "15px"}}>Body Part: {exercise?.bodypart}</IonTitle>
            <IonTitle style={{margin: "15px"}}>Equipment Needed: {exercise?.equipment}</IonTitle>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonButton onClick={() => setOpen(false)}>Close</IonButton>
    </IonContent>
  );
}

export default ModalBody;

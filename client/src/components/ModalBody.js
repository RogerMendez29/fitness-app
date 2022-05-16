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
      <IonHeader className="header">
        <IonToolbar>
          <IonTitle>{exercise ? exercise?.name : null}</IonTitle>
          <IonButton color="dark" slot="end" onClick={() => setOpen(false)}>
            Close
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol className="modal-col">
            <IonCard>
              <IonTitle className="modal-title" style={{ margin: "15px" }}>
                Target: {exercise?.target}
              </IonTitle>
              <IonTitle className="modal-title" style={{ margin: "15px" }}>
                Body Part: {exercise?.bodypart}
              </IonTitle>
              <IonTitle className="modal-title" style={{ margin: "15px" }}>
                Equipment Needed: {exercise?.equipment}
              </IonTitle>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{ marginBottom: "5rem" }}>
            <div className="gif-container">
              <img
                className="gif"
                src={exercise ? exercise?.gif_url : null}
                // rel:animated_src="./example1.gif"
                width="360"
                height="360"
                // rel:auto_play="1"
                // rel:rubbable="1"
              />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}

export default ModalBody;

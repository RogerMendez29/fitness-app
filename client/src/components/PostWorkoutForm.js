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
  IonTextarea

} from "@ionic/react";
import {useState, useEffect} from 'react'

const PostWorkoutForm = () => {
    const [creating, setCreating] = useState(false);


  return (
    <div className="post-container">
      <IonTitle>Home</IonTitle>
      <IonButton
        onClick={() => {
          setCreating(!creating);
          console.log(creating);
        }}
        className="toggle-form"
      >
        Post a Workout
      </IonButton>
      {creating ? (
        <form className="workout-form">
          <IonItem>
            <IonInput placeholder="Workout name"></IonInput>
            <IonSelect
              okText="Okay"
              cancelText="Dismiss"
              placeholder="difficulty"
            >
              <IonSelectOption value="true">Intermediate</IonSelectOption>
              <IonSelectOption value="false">easy</IonSelectOption>
              <IonSelectOption value="false">hard</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonTextarea
              className="description-box"
              placeholder="Description:"
            ></IonTextarea>
          </IonItem>
          <IonButton>Submit</IonButton>
        </form>
      ) : null}
    </div>
  );
};

export default PostWorkoutForm

import { IonContent, IonPage } from "@ionic/react";
import SetupForm from "../components/SetupForm";
import "../theme/Login.css";

const Setup = ({}) => {
  return (
    <IonPage>
      <IonContent class="login-content">
        <SetupForm />
      </IonContent>
    </IonPage>
  );
};

export default Setup;

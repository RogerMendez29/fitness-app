import { IonContent, IonPage } from "@ionic/react";
import SignupForm from "../components/SignupForm";
import "../theme/Login.css";

const Signup = () => {
  return (
    <IonPage>
      <IonContent class="login-content">
        <SignupForm />
      </IonContent>
    </IonPage>
  );
};

export default Signup;

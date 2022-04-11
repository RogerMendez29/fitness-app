import { IonContent, IonPage } from "@ionic/react";
import SignupForm from "../components/SignupForm";
import "../theme/Login.css";

const Signup = ({setCurrentUser}) => {
  return (
    <IonPage>
      <IonContent class="login-content">
        <SignupForm setCurrentUser={setCurrentUser}/>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

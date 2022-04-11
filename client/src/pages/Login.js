import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../components/LoginForm";
import "../theme/Login.css";

const Login = ({ setCurrentUser }) => {
 

  return (
    <IonPage>
      <IonContent class="login-content">
        <LoginForm setCurrentUser={setCurrentUser} />
      </IonContent>
    </IonPage>
  );
};

export default Login;

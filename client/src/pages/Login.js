import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../components/LoginForm";
import "../theme/Login.css";

const Login = () => {
  return (
    <IonPage>
      <IonContent class="login-content">
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;

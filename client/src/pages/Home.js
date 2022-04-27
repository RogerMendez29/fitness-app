import "../theme/Home.css";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonTitle,
  IonCard,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonList,
  IonLabel,
} from "@ionic/react";
import PostWorkoutForm from "../components/PostWorkoutForm";

import { useState, useEffect } from "react";

const Home = ({ currentUser, renderWorkouts, workouts }) => {
  const [users, setUsers] = useState([]);

  let history = useHistory();

  function navToUserPage(id) {
    history.push(`/user_page/${id}`);
  }

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function renderUsers() {
    const userCards = users.map((user) => {
      if (user.profile.first_name && user.id !== currentUser.id) {
        return (
          <ion-card
            onClick={() => navToUserPage(user.id)}
            key={user.id}
            color="medium"
            className="user-card"
          >
            <ion-card-header>
              {user_image(user)}
              <ion-card-subtitle>
                {user.profile.first_name} {user.profile.last_name}
                <IonButton className="follow-btn" size="small">
                  Follow
                </IonButton>
              </ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        );
      }
    });
    return userCards;
  }

  function user_image(user) {
    return user.profile?.profile_thumbnail ? (
      <img className="ionicon" src={user.profile.profile_thumbnail} />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512"
      >
        <title>Person Circle</title>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
      </svg>
    );
  }

  return (
    <IonPage>
      <IonContent class="home-page-content">
        <IonGrid class="home-grid">
          <IonRow className="row ">
            <IonCol className="">
              <div className="suggested-users-cont">
                <IonTitle>People You Might Like</IonTitle>
                <div className="users-container">
                  <div>{renderUsers()}</div>
                </div>
              </div>
            </IonCol>
            <IonCol className="right-col">
              <div className="home-content">
                <PostWorkoutForm currentUser={currentUser} />

                <div className="workout-container">
                  {renderWorkouts(workouts)}
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

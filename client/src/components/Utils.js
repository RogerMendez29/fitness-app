import { IonLabel, IonList, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton } from "@ionic/react";

export function renderWorkouts(workouts) {
  const workoutCards = workouts?.map((workout) => {
    if (workout.workout_exercises?.length > 0) {
      return (
        <ion-card key={workout.id}>
          <ion-card-header>
            <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
            <ion-card-title>{workout.name}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {workout.workout_exercises?.map((exercise) => {
              return (
                <IonList key={exercise.id}>
                  <IonItem>
                    <IonLabel> {exercise.name}</IonLabel>
                    <IonLabel> Sets: {exercise.sets}</IonLabel>
                    <IonLabel> Reps: {exercise.reps}</IonLabel>
                    <IonLabel> Rest: {exercise.rest}</IonLabel>

                    <IonLabel> Weight: {exercise.weight}</IonLabel>
                    <IonLabel> Time: {exercise.time} s</IonLabel>
                    <IonLabel> Distance: {exercise.distance}</IonLabel>
                  </IonItem>
                </IonList>
              );
            })}
          </ion-card-content>
        </ion-card>
      );
    } else {
      return null;
    }
  });
  return workoutCards;
}

export function RenderUsers(users) {
  const { handleLogout, currentUser } = useAuth();
  let history = useHistory();

  function navToUserPage(id) {
    history.push(`/user_page/${id}`);
  }

  function userImage(user) {
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
            {userImage(user)}
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

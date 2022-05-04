import { IonLabel, IonList, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useReducer } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";

export function renderWorkouts(workouts) {
  const unwantedKeys = ["id", "workout_id", "exercise_id"];

  const workoutCards = workouts?.map((workout) => {
    if (workout.workout_exercises?.length > 0) {
      return (
        <ion-card key={workout.id}>
          <ion-card-header>
            <ion-card-subtitle> {workout.posted_by}</ion-card-subtitle>
            <ion-card-title>{workout.name}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <IonList>
              {workout.workout_exercises?.map((exercise) => {
                return (
                  <IonList key={exercise.id}>
                    <IonItem>
                      <IonLabel> {exercise.name}</IonLabel>
                      {exercise.sets ? (
                        <IonLabel> Sets: {exercise.sets}</IonLabel>
                      ) : null}
                      {exercise.reps ? (
                        <IonLabel> Reps: {exercise.reps}</IonLabel>
                      ) : null}
                      {exercise.rest ? (
                        <IonLabel> Rest: {exercise.rest}s</IonLabel>
                      ) : null}

                      {exercise.weight ? (
                        <IonLabel> Weight: {exercise.weight} Ibs</IonLabel>
                      ) : null}
                      {exercise.time ? (
                        <IonLabel> Time: {exercise.time}minutes</IonLabel>
                      ) : null}
                      {exercise.distance ? (
                        <IonLabel> Distance: {exercise.distance}miles</IonLabel>
                      ) : null}
                    </IonItem>
                  </IonList>
                );
              })}
            </IonList>
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
  const [followeeIds, setFolloweeIds] = useState([]);
  // const [followerIdsState, setFollowerIdsState] = useState([]);

  useEffect(() => {
    followees.map((followee) => setFolloweeIds([...followeeIds, followee.id]));
  }, []);

  const {
    handleLogout,
    currentUser,
    followers,
    followees,
    setFollowers,
    setFollowees,
  } = useAuth();
  let history = useHistory();

  function navToUserPage(id) {
    history.push(`/user_page/${id}`);
  }
  // let followerIds = followers.map((follower) => follower.id);
  console.log(followeeIds);

  function userImage(user) {
    return user.profile?.profile_thumbnail ? (
      <IonAvatar>
        <img
          src={user.profile.profile_thumbnail}
          onClick={() => navToUserPage(user.id)}
        />
      </IonAvatar>
    ) : (
      <IonAvatar>
        <svg
          onClick={() => navToUserPage(user.id)}
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Person Circle</title>
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
        </svg>
      </IonAvatar>
    );
  }

  function handleFollow(id) {
    if (followeeIds.includes(id)) {
      fetch(`/api/users/unfollow/${id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          let updateIds = followeeIds.filter((oldId) => oldId !== id);
          setFolloweeIds(updateIds);
        }
      });
    } else {
      fetch(`/api/users/follow/${id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followee_id: 1,
          follower_id: currentUser.id,
        }),
      }).then((res) => {
        if (res.ok) {
          setFolloweeIds([...followeeIds, id]);
        }
      });
    }
  }

  const userCards = users.map((user) => {
    if (user.profile.first_name && user.id !== currentUser.id) {
      return (
        <ion-card key={user.id} color="medium" className="user-card">
          <ion-card-header>
            {userImage(user)}
            <ion-card-subtitle>
              {user.profile.first_name} {user.profile.last_name}
              <IonButton
                onClick={() => handleFollow(user.id)}
                className="follow-btn"
                size="small"
              >
                {followeeIds.includes(user.id) ? "Unfollow" : "Follow"}
              </IonButton>
            </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      );
    }
  });
  return userCards;
}

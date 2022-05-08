import "../theme/Home.css";
import { IonGrid, IonRow, IonCol, IonContent, IonTitle } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { IonPage } from "@ionic/react";
import PostWorkoutForm from "../components/PostWorkoutForm";
import RenderUsers from "../components/RenderUsers";
import { useAuth } from "../components/contexts/AuthContext";
import { useState, useEffect } from "react";
import RenderWorkouts from "../components/RenderWorkouts";

const Home = ({
  setUser,
  canModify,
  handleFollow,
  followeeIds,
  setFolloweeIds,
  followIdees,
}) => {
  const { workouts, users, currentUser } = useAuth();


  const feed = workouts.filter((workout) =>
    followeeIds.includes(workout.user_id)
  );

  console.log(feed);

  return (
    <IonPage>
      <IonContent class="home-page-content">
        <IonGrid class="home-grid">
          <IonRow className="row ">
            <IonCol size-md className="">
              <div className="suggested-users-cont">
                <IonTitle>People You Might Like</IonTitle>
                <div className="users-container">
                  <RenderUsers
                  followIdees={followIdees}
                    setFolloweeIds={setFolloweeIds}
                    followeeIds={followeeIds}
                    setUser={setUser}
                    users={users}
                    handleFollow={handleFollow}
                  />
                </div>
              </div>
            </IonCol>
            <IonCol className="right-col">
              <div className="home-content">
                <PostWorkoutForm />

                <div className="workout-container">
                  <RenderWorkouts canModify={canModify} posts={feed} />
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

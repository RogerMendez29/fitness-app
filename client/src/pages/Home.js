import "../theme/Home.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonTitle,
  IonSearchbar,
} from "@ionic/react";
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
  // followeeIds,
  // setFolloweeIds,
}) => {
  const { workouts, users, currentUser, followeeIds, setFolloweeIds } =
    useAuth();
  const [search, setSearch] = useState("");
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    fetch(`api/suggested_users`)
      .then((response) => response.json())
      .then((data) => setSuggested(data.slice(0, 6)));
  }, []);

  console.log(suggested);

  let searchResults = [];

  searchResults = users.filter((user) => {
    if (user.profile.first_name && user.profile.last_name) {
      return (
        user.profile?.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.profile?.last_name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return null;
    }
  });

  const createFeed = () => {
    followeeIds.push(currentUser.id);
    const feed = workouts.filter((workout) =>
      followeeIds.includes(workout.user_id)
    );

    return feed;
  };

  const feed = workouts.filter((workout) =>
    followeeIds.includes(workout.user_id)
  );

  function handleSearch(event) {
    setSearch(event.detail.value);
  }

  return (
    <IonPage>
      <IonContent class="">
        <IonGrid class="">
          <IonRow className="row">
            <IonCol className="">
              {/* <div className="suggested-users-cont"> */}
              <IonTitle>People You Might Like</IonTitle>
              {/* <div className="users-container"> */}
              <RenderUsers
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                setUser={setUser}
                users={suggested}
                handleFollow={handleFollow}
              />
              {/* </div> */}
              {/* </div> */}
            </IonCol>
            <IonCol size="7" className="right-col">
              <div className="home-content">
                <PostWorkoutForm />

                <div className="workout-container">
                  <RenderWorkouts canModify={canModify} posts={createFeed()} />
                </div>
              </div>
            </IonCol>
            <IonCol className="search-col">
              <IonSearchbar
                value={search}
                className="search-bar"
                placeholder="Search  by Name"
                onIonChange={handleSearch}
              ></IonSearchbar>
              {search.length > 0 ? (
                <RenderUsers
                  // followIdees={followIdees}
                  setFolloweeIds={setFolloweeIds}
                  followeeIds={followeeIds}
                  setUser={setUser}
                  users={searchResults}
                  handleFollow={handleFollow}
                />
              ) : null}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

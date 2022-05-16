import "../theme/Home.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonTitle,
  IonSearchbar,
} from "@ionic/react";
import { IonPage } from "@ionic/react";
import PostWorkoutForm from "../components/PostWorkoutForm";
import RenderUsers from "../components/RenderUsers";
import { useAuth } from "../components/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RenderWorkouts from "../components/RenderWorkouts";

const Home = ({ setUser, canModify, handleFollow }) => {
  const { workouts, currentUser, followeeIds, setFolloweeIds, users } =
    useAuth();
  const [suggested, setSuggested] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  let searchBar;

  useEffect(() => {
    fetch(`api/suggested_users`)
      .then((response) => response.json())
      .then((data) => setSuggested(data.slice(0, 12)));
  }, []);

  const createFeed = () => {
    const feed = workouts.filter(
      (workout) =>
        followeeIds.includes(workout.user_id) ||
        workout.user_id === currentUser.id
    );

    return feed;
  };

  function handleSearch(event) {
    const value = event.detail.value;
    searchBar.value = value;
    getSearchResults(value);
  }

  function getSearchResults(value) {
    const filteredUsers = users?.filter((user) => {
      return (
        user?.username.toLowerCase().includes(value.toLowerCase()) ||
        user.profile?.first_name?.toLowerCase().includes(value.toLowerCase()) ||
        user.profile?.last_name?.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchResults(value ? filteredUsers : []);
  }

  return (
    <IonPage>
      <IonContent class="main-content">
        <IonGrid class="">
          <IonRow className="" style={{ marginRight: "0" }}>
            <IonCol size="" className="">
              <IonTitle
                style={{
                  marginBottom: "3.25rem",
                  fontWeight: "bold",
                  fontSize: "23px",
                }}
              >
                Who To Follow
              </IonTitle>
              <RenderUsers
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                setUser={setUser}
                users={suggested}
                handleFollow={handleFollow}
              />
            </IonCol>
            <IonCol size="7" className="suggested-col">
              <IonTitle
                style={{
                  marginBottom: "3.25rem",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Home Feed
              </IonTitle>

              <div className="home-content">
                <PostWorkoutForm />

                <div className="workout-container">
                  <RenderWorkouts
                    canModify={canModify}
                    setUser={setUser}
                    posts={createFeed()}
                  />
                </div>
              </div>
            </IonCol>
            <IonCol size="" className="">
              <IonSearchbar
                style={{ marginBottom: "1.5rem" }}
                ref={(el) => (searchBar = el)}
                className="search-bar"
                placeholder="Search by Name"
                onIonChange={handleSearch}
              ></IonSearchbar>
              <RenderUsers
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                setUser={setUser}
                users={searchResults}
                handleFollow={handleFollow}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

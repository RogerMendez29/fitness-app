import "../theme/Profile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  IonContent,
  IonPage,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonTitle,
  IonCard,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";
import CloudinaryUpload from "../components/CloudinaryUpload";
import RenderWorkouts from "../components/RenderWorkouts";
import EditProfileForm from "../components/EditProfileForm";
import RenderUsers from "../components/RenderUsers";

const Profile = ({
  user,
  currentUser,
  handleFollow,
  followeeIds,
  setFolloweeIds,
  setUser,
  canModify,
  users,
}) => {
  const { workouts, setCurrentUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [followees, setFollowees] = useState(0);
  const [toggleFollowers, setToggleFollowers] = useState(false);

  useEffect(() => {
    if (user) {
      setFollowers(user?.followers.length);
      setFollowees(user?.followees.length);
    } else {
      setFollowers(currentUser?.followers.length);
      setFollowees(currentUser?.followees.length);
    }
  }, []);


  function toggleUsers() {
    const userPageFolloweeIds = user?.followees.map((user) => user.id);
    const followees = () => {
      if (userPageFolloweeIds) {
        return users.filter((user) => userPageFolloweeIds.includes(user.id));
      } else {
        return users.filter((user) => followeeIds.includes(user.id));
      }
    };

    const followers = () => {
      if (userPageFolloweeIds) {
        const followerIds = user?.followers.map((user) => user.id);
        return users.filter((user) => followerIds.includes(user.id));
      } else {
        const followerIds = currentUser?.followers.map((user) => user.id);
        return users.filter((user) => followerIds.includes(user.id));
      }
    };

    if (toggleFollowers) {
      return followers();
    } else {
      return followees();
    }
  }

  function dateJoined() {
    if (user) {
      let date = user?.created_at;
      let parsed = Date.parse(date);
      let newDate = new Date(parsed).toISOString().slice(0, 10);
      return newDate;
    } else {
      let date = currentUser?.created_at;
      let parsed = Date.parse(date);
      let newDate = new Date(parsed).toISOString().slice(0, 10);
      return newDate;
    }
  }

  function sortUsers() {
    if (user) {
      let workoutIds = user?.workouts?.map((workout) => {
        return workout?.id;
      });

      let userPosts = workouts?.filter((workout) => {
        return workoutIds.includes(workout.id);
      });

      return userPosts;
    } else {
      let workoutIds = currentUser?.workouts?.map((workout) => {
        return workout?.id;
      });

      let userPosts = workouts?.filter((workout) => {
        return workoutIds.includes(workout.id);
      });

      return userPosts;
    }
  }

  function handleUpload(result) {
    const body = {
      profile_photo: result.info.secure_url,
      profile_thumbnail: result.info.eager[0].secure_url,
    };
    fetch("/api/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user);
      });
  }

  function imageLink() {
    if (user) {
      return (
        user?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png"
      );
    } else {
      return (
        currentUser?.profile?.profile_photo ||
        "https://res.cloudinary.com/dpkrqs9rs/image/upload/v1637085098/Profile_avatar_placeholder_large_ky4gfw.png"
      );
    }
  }

  const profileTitle = () => {
    if (user) {
      return user?.workouts.length === 0 ? "No Posts Available" : "Posts";
    } else {
      return currentUser.workouts.length === 0 ? "No Posts Available" : "Posts";
    }
  };

  return (
    <IonPage className="">
      <IonContent class="">
        <IonGrid className="">
          <IonRow className="">
            <IonCol style={{ marginTop: "1rem" }} size="" className="">
              <IonTitle
                style={{
                  marginBottom: "3.25rem",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Profile
              </IonTitle>

              <IonCard className="profile-card">
                <img className="profile-image" src={imageLink()} />
                <CloudinaryUpload
                  user={user}
                  preset="nn7aqzhz"
                  buttonText="Upload"
                  handleUpload={handleUpload}
                />
                {user ? (
                  <IonButton
                    onClick={() => handleFollow(user.id)}
                    className="user-page-follow"
                    size="small"
                  >
                    {followeeIds.includes(user.id) ? "Unfollow" : "Follow"}
                  </IonButton>
                ) : (
                  <div>
                    <IonButton
                      style={{ margin: "5%" }}
                      size="small"
                      onClick={() => setEditing(!editing)}
                      className="edit-profile-btn"
                    >
                      {editing ? "Done" : "Edit Profile"}
                    </IonButton>
                  </div>
                )}

                <ion-card-header>
                  <IonCardTitle>
                    {user
                      ? user.profile.first_name
                      : currentUser?.profile.first_name}{" "}
                    {user
                      ? user.profile.last_name
                      : currentUser?.profile.last_name}
                  </IonCardTitle>
                  <IonCardSubtitle>Date Joined: {dateJoined()}</IonCardSubtitle>
                  <IonCardSubtitle>
                    followers: {followers} following: {followees}
                  </IonCardSubtitle>
                </ion-card-header>
                <ion-card-content>
                  <ion-label>Bio: </ion-label>
                  {user ? user?.profile?.bio : currentUser?.profile.bio}
                </ion-card-content>
              </IonCard>

              {editing ? (
                <IonCard style={{ marginTop: "1rem" }}>
                  <EditProfileForm
                    editing={editing}
                    currentUser={currentUser}
                    setEditing={setEditing}
                    setCurrentUser={setCurrentUser}
                  />
                </IonCard>
              ) : (
                <IonCardHeader></IonCardHeader>
              )}
            </IonCol>
            <div
              className="user-workouts-container"
              style={{ marginRight: "1rem", marginLeft: "1rem" }}
            >
              <IonCol
                style={{ marginLeft: "2rem", marginRight: "2rem" }}
                size="8"
                className=""
              >
                <IonTitle
                  style={{
                    marginBottom: "3.25rem",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  {profileTitle()}
                </IonTitle>

                <RenderWorkouts setPosts={setPosts} posts={sortUsers()} />
              </IonCol>
            </div>
            <IonCol style={{ marginTop: "1rem" }}>
              <div className="title-header">
                <div className="col">
                  <IonTitle
                    style={{
                      textDecoration: toggleFollowers ? "underline" : "none",
                    }}
                    className="title"
                    onClick={() => setToggleFollowers(true)}
                  >
                    Followers
                  </IonTitle>
                </div>
                <div className="col">
                  <IonTitle
                    style={{
                      textDecoration:
                        toggleFollowers === false ? "underline" : "none",
                    }}
                    className="title"
                    onClick={() => setToggleFollowers(false)}
                  >
                    Following
                  </IonTitle>
                </div>
              </div>

              <div className="following-container"></div>
              <div className="title-header" style={{ display: "inline" }}></div>

              <RenderUsers
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                setUser={setUser}
                users={toggleUsers()}
                handleFollow={handleFollow}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

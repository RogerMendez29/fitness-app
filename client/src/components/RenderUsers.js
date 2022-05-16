import { IonLabel, IonList, IonItem, IonCard } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { IonButton, IonAvatar } from "@ionic/react";
import "../theme/UserCard.css";

function RenderUsers({ users, setUser, handleFollow, followeeIds }) {
  const { currentUser, followees } = useAuth();

  let history = useHistory();

  function navToUserPage(id) {
    setUser(null);
    history.push(`/user_page/${id}`);
    console.log(id);
    fetch(`/api/user_page/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }

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

  const userCards = users?.map((user) => {
    if (user.profile.first_name && user.id !== currentUser.id) {
      return (
        <IonCard key={user.id} class="user-card">
          <div className="user-card-content">
            {userImage(user)}
            <div>
              {user.profile.first_name} {user.profile.last_name}
              <div>@{user?.username}</div>
            </div>

            {/* <div>@</div> */}
            <IonButton
              className="follow-btn"
              onClick={() => handleFollow(user.id)}
              color="dark"
              size="small"
            >
              {followeeIds.includes(user.id) ? "Following" : "Follow"}
            </IonButton>
          </div>
        </IonCard>
      );
    }
  });
  return userCards;
}
export default RenderUsers;

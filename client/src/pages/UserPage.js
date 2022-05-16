import { Redirect, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IonApp, IonTabs } from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";
import Profile from "./Profile";

function UserPage({
  user,
  setUser,
  canModify,
  handleFollow,
  followeeIds,
  setFolloweeIds,
  currentUser,
  users,
}) {
  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/user_page/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  if (user) {
    return (
      <Profile
        currentUser={currentUser}
        followeeIds={followeeIds}
        users={users}
        setFolloweeIds={setFolloweeIds}
        setUser={setUser}
        canModify={canModify}
        handleFollow={handleFollow}
        user={user}
      />
    );
  } else {
    return <div></div>;
  }
}

export default UserPage;

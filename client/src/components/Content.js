import { Route, NavLink, Switch } from "react-router-dom";
import { ellipse, square, triangle, logout } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";

import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonPopover,
  IonAvatar,
  IonToolbar,
  IonList,
  IonButton,
  IonItem,
  IonHeader,
} from "@ionic/react";
import Home from "../pages/Home";
import Calender from "../pages/Calender";
import Profile from "../pages/Profile";
import UserPage from "../pages/UserPage";
import "../theme/Content.css";

import { useAuth } from "../components/contexts/AuthContext";

const Content = () => {
  const { handleLogout, currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [followeeIds, setFolloweeIds] = useState([]);

  const [canModify, setCanModify] = useState(currentUser.user_can_modify);

  function profileImage() {
    return currentUser.profile?.profile_thumbnail ? (
      <IonAvatar className="icon-tab">
        <img className="icon-tab" src={currentUser.profile.profile_thumbnail} />
      </IonAvatar>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon-tab"
        viewBox="0 0 512 512"
      >
        <title>Person Circle</title>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
      </svg>
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

  return (
    <div>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/calender">
              <Calender />
            </Route>
            <Route exact path="/profile">
              <Profile currentUser= {currentUser} followeeIds= {followeeIds} />
            </Route>
            <Route exact path="/user_page/:id">
              <UserPage
                user={user}
                setUser={setUser}
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                canModify={canModify}
                handleFollow={handleFollow}
              />
            </Route>
            <Route path="/home">
              <Home
                setFolloweeIds={setFolloweeIds}
                followeeIds={followeeIds}
                setUser={setUser}
                canModify={canModify}
                handleFollow={handleFollow}
              />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon size="large" icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="calender" href="/calender">
              <IonIcon size="large" icon={ellipse} />
              <IonLabel>Calender</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              {profileImage()}
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="logout" href="/login">
              <svg
                onClick={handleLogout}
                xmlns="http://www.w3.org/2000/svg"
                className="icon-tab"
                viewBox="0 0 512 512"
              >
                <title>Log Out</title>
                <path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zM459.31 244.69l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z" />
              </svg>

              <IonLabel>Logout</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </div>
  );
};

export default Content;

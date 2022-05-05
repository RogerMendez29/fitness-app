import { Redirect, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { useAuth } from "../components/contexts/AuthContext";
import Profile from "./Profile";

function UserPage() {
  let { id } = useParams();

  const [user, setUser] = useState();

  

  useEffect(() => {
    setUser(null);
    fetch(`/api/user_page/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  if (user) {
    return <Profile user={user} />;
  } else {
    return <div></div>;
  }
}

export default UserPage;

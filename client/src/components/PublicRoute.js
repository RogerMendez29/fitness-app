import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { users, currentUser } = useAuth();
  let ids = users.map(user => user.id)
  
  if (currentUser) {

    if (!ids.includes(currentUser.id)) {
      return <Redirect to="/account-setup" />;
    } else {
      return <Redirect to="/home" />;
    }
  }
  return children;
};

export default PublicRoute;

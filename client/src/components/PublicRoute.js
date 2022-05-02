import { Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Redirect to="/home" /> : children;
};

export default PublicRoute;

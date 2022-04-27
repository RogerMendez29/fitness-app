import { Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }: any) => {
  const { currentUser } = useAuth();

  return currentUser ? <Redirect to="/" /> : children;
};

export default PublicRoute;

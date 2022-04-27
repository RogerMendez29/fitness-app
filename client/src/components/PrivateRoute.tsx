import { Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }: any) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Redirect to="login" />;
};

export default PrivateRoute;

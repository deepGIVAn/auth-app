import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Navigate here is the componenet while useNavigate is just like another function to use

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

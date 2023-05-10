import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem("token");
    console.log("token",token);
    if (token) {
      const user = { loggedIn: true };
      return user && user.loggedIn;
    } else {
      const user = { loggedIn: false };
      return user && user.loggedIn;
    }
  };


const Protected = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};


export default Protected;
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/(auth)/SignIn";
import SignUp from "../pages/(auth)/SignUp";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Mypage from "../pages/Mypage";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  const ProtectedRoute = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
  };

  const PublicRoute = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      {/* Common Routes */}
      <Route path="/" element={<Home />} />
      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

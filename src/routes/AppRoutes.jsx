import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import { Search } from "../pages/Search";
import { CampingDetail } from "../pages/CampingDetail";
import { AuthContext } from "../shared/contexts/AuthContext";
import { Home } from "../pages/Home";
import { CampingAll } from "../pages/CampingAll";
import SignIn from "../pages/(auth)/SignIn";
import SignUp from "../pages/(auth)/SignUp";
import Mypage from "../pages/(auth)/Mypage";
import { Chat } from "../pages/Chat";
import { ChatRoom } from "../pages/ChatRoom";

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
      <Route path="/search" element={<Search />} />
      <Route path="/camping" element={<CampingAll />} />
      <Route path="/camping/:id" element={<CampingDetail />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<ChatRoom />} />
      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

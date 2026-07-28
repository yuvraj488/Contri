import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import Dashboard from "@/pages/Dashboard/Dashboard";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import HomeRedirect from "@/components/auth/HomeRedirect";
import PublicRoute from "@/components/auth/PublicRoute";
function App() {
  return (
    <Routes>
      {/* Entry Route */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public Routes */}
      <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/signup"
  element={
    <PublicRoute>
      <Signup />
    </PublicRoute>
  }
/>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
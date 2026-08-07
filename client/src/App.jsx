import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateGroup from "@/pages/Groups/CreateGroup";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import HomeRedirect from "@/components/auth/HomeRedirect";
import PublicRoute from "@/components/auth/PublicRoute";
import GroupCreated from "@/pages/Groups/GroupCreated";
import GroupDetails from "@/pages/Groups/GroupDetails";
import JoinGroup from "@/pages/Groups/JoinGroup";
import AddExpense from "@/pages/Expenses/AddExpense";

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

  <Route
    path="/groups/create"
    element={
      <ProtectedRoute>
        <CreateGroup />
      </ProtectedRoute>
    }
  />

  <Route
    path="/groups/created"
    element={
      <ProtectedRoute>
        <GroupCreated />
      </ProtectedRoute>
    }
  />

  <Route
    path="/groups/:groupId"
    element={
      <ProtectedRoute>
        <GroupDetails />
      </ProtectedRoute>
    }
  />

  <Route
  path="/groups/join"
  element={
    <ProtectedRoute>
      <JoinGroup />
    </ProtectedRoute>
  }
/>

<Route
  path="/groups/:groupId/add-expense"
  element={
    <ProtectedRoute>
      <AddExpense />
    </ProtectedRoute>
  }
/>

</Routes>
    
  );
}

export default App;
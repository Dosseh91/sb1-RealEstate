import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ListingProvider } from './contexts/ListingContext';
import Register from './pages/Register';

/**
 * A component to protect routes that require authentication.
 * It checks if a user is logged in and has the required role.
 */
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading indicator while checking authentication status
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires specific roles and the user doesn't have one, redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated and has the correct role, show the content
  return <>{children}</>;
};

/**
 * A layout component that includes the Navbar and Footer.
 * This ensures a consistent look across different pages.
 */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

/**
 * The main App component that sets up all the application routing.
 */
function App() {
  return (
    <AuthProvider>
      <ListingProvider>
        <Router>
          <Routes>
            {/* These routes are public and will have the main layout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/listings" element={<MainLayout><Listings /></MainLayout>} />
            <Route path="/listings/:id" element={<MainLayout><ListingDetail /></MainLayout>} />
            
            {/* The Login page does not have the main layout */}
            <Route path="/login" element={<Login />} />
            
            {/* The Register page is now wrapped in MainLayout to include the Navbar and Footer */}
            <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

            {/* These routes are protected and can only be accessed by specific user roles */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MainLayout><AdminDashboard /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/dashboard"
              element={
                <ProtectedRoute allowedRoles={['agency']}>
                  <MainLayout><AgencyDashboard /></MainLayout>
                </ProtectedRoute>
              }
            />

            {/* This is a "catch-all" route that redirects any unknown URL to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ListingProvider>
    </AuthProvider>
  );
}

export default App;

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

// Protected route component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Layout with navbar and footer
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// App component
function App() {
  return (
    <AuthProvider>
      <ListingProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/listings" element={<MainLayout><Listings /></MainLayout>} />
            <Route path="/listings/:id" element={<MainLayout><ListingDetail /></MainLayout>} />
            <Route path="/login" element={<Login />} />
            
            {/* ADD THIS LINE - The fix for your button */}
            <Route path="/register" element={<Register />} />

            {/* Protected admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MainLayout><AdminDashboard /></MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected agency routes */}
            <Route
              path="/agency/dashboard"
              element={
                <ProtectedRoute allowedRoles={['agency']}>
                  <MainLayout><AgencyDashboard /></MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ListingProvider>
    </AuthProvider>
  );
}

export default App;

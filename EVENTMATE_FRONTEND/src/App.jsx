import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import AuthPage from "./components/Authpage";
import MyAccount from "./components/MyAccount";
import CompleteProfile from "./components/CompleteProfile";
import CustomerDashboard from "./components/CustomerDashboard";
import AddEvent from "./components/AddEvent";
import MyBookings from "./components/MyBookings";
import ViewEvent from "./components/ViewEvent";

// ===== Admin Imports =====
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageEvents from "./pages/admin/ManageEvents";
import Feedbacks from "./pages/admin/Feedbacks";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoutes";
import AddService from "./pages/admin/AddService";

// ===== Layout Wrapper =====
const Layout = ({ children }) => {
  const location = useLocation();

  // ❌ Hide Navbar & Footer for these routes
  const hideForRoutes = ["/admin", "/auth", "/myaccount","/viewevent","/mybookings", "/dashboard", "/complete-profile"];
  const shouldHideLayout = hideForRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* === USER ROUTES === */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/mybookings" element={<MyBookings />} />
          
          <Route path="/viewevent" element={<ViewEvent />} />
           <Route path="/addevent/:id" element={<AddEvent />} />


          {/* === ADMIN ROUTES === */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="addservice" element={<AddService />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

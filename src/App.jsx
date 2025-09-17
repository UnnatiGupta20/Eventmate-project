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
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddEvent from "./components/AddEvent";

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar & Footer on login/signup
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup"  || location.pathname === "/addevent";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addevent/:id" element={<AddEvent />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
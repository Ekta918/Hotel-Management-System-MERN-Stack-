import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Navbar from "./components/Navbar"; // assuming you have a Navbar component
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import AboutUs from "./components/AboutUs"; // adjust the path as needed
import ContactUs from "./components/ContactUs";
import Faq from "./components/faq";
import TermsAndConditions from "./components/TermsAndConditions";
import Support from "./components/Support";
import ReviewScreen from "./screens/ReviewScreen";

function App() {
  return (
    <Router>
      {/* Add your nav bar outside the Routes if you want it on every page */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingscreen />} />
        <Route path="/home" element={<Homescreen />} />
        <Route
          path="/book/:roomid/:fromdate/:todate"
          element={<Bookingscreen />}
        />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/profile" element={<Profilescreen />} />
        <Route path="/admin" element={<Adminscreen />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/support" element={<Support />} />
        <Route path="/review/:roomid" element={<ReviewScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

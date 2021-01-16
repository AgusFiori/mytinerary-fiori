import React from "react";
import Navbar from "./components/Navbar.jsx";
import FooterPage from "./components/Footer.jsx";
import { Section } from "./components/Section.jsx";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Section />
      </Router>
      <FooterPage />
    </div>
  );
}

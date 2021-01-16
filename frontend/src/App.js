import React from "react";
import Navbar from "./components/Navbar.jsx";
import FooterPage from "./components/Footer.jsx";
import { Section } from "./components/Section.jsx";
import Cities from "./components/Cities.jsx";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Section} />
        <Route path="/cities" component={Cities} />
        <FooterPage />
      </BrowserRouter>
    </div>
  );
}

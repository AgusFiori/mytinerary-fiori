import React from "react";
import Navbar from "./components/Navbar.jsx";
import FooterPage from "./components/Footer.jsx";
import { Section } from "./components/Section.jsx";
import Cities from "./components/Cities.jsx";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import City from "./components/City.jsx";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Section} />
          <Route path="/cities" component={Cities} />
          <Route path="/city/:id" component={City} />
          <Redirect to="/"></Redirect>
        </Switch>
        <FooterPage />
      </BrowserRouter>
    </div>
  );
}

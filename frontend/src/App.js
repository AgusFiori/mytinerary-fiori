import React from "react";
import Navbar from "./components/Navbar.jsx";
import FooterPage from "./components/Footer.jsx";
import { Section } from "./components/Section.jsx";
import Cities from "./components/Cities.jsx";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import City from "./components/City.jsx";
import { Admin } from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { connect } from "react-redux";

function App(props) {
  if (props.loggedUser) {
    var routes = (
      <Switch>
        <Route exact path="/" component={Section} />
        <Route path="/admin" component={Admin} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Redirect to="/"></Redirect>
      </Switch>
    );
  } else {
    var routes = (
      <Switch>
        <Route exact path="/" component={Section} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {routes}
        <FooterPage />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

export default connect(mapStateToProps)(App);

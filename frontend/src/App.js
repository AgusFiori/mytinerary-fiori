import React from "react";
import Navbar from "./components/Navbar.jsx";
import FooterPage from "./components/Footer.jsx";
import { Section } from "./components/Section.jsx";
import Cities from "./components/Cities.jsx";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import City from "./components/City.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { connect } from "react-redux";
import authActions from "./redux/actions/authActions.js";
import { useState } from "react";

function App(props) {
  const [reload, setReload] = useState(false);
  if (props.loggedUser) {
    var routes = (
      <Switch>
        <Route exact path="/" component={Section} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Redirect to="/"></Redirect>
      </Switch>
    );
  } else if (localStorage.getItem("token")) {
    // si refresco, se pierden los datos del store, entonces tomo los guardados en el local storage
    props.logFromLS(localStorage.getItem("token")).then((respuesta) => {
      // despacha la accion logFromLS
      if (respuesta === "/") setReload(!reload);
    });
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

const mapDispatchToProps = {
  logFromLS: authActions.logFromLS,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

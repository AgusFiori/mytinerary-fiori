import React, { useEffect, useState } from "react";
import "../styles/userforms.css";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import GoogleLogin from "react-google-login";
import axios from "axios";
import Swal from "sweetalert2";

const Register = (props) => {
  const [newUser, setNewUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  //funcion que lee el input y setea un objeto con los datos del nuevo usuario
  const leerInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  //destructuracion de propiedades del objeto nuevo de usuario
  const {
    username,
    password,
    confirmation,
    email,
    firstname,
    lastname,
    urlPic,
    country,
  } = newUser;

  // alerta para features no disponibles
  const upcoming = () => {
    Swal.fire({
      title: `This is an upcoming feature!`,
      text: "😅",
      icon: "info",
      confirmButtonText: "Ok",
    });
  };

  // objeto de errores para despues pasarle al estado
  const erroresObj = {
    username: null,
    password: null,
    confirmation: null,
    email: null,
    firstname: null,
    lastname: null,
    urlPic: null,
    country: null,
  };

  //client side validator
  const validate = async (e) => {
    e.preventDefault();
    if (
      !username ||
      !password ||
      !confirmation ||
      !email ||
      !firstname ||
      !lastname ||
      !urlPic ||
      !country
    ) {
      Swal.fire({
        title: "Oops!",
        text: "All fields must be complete",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false;
    }
    const respuesta = await props.signUp(newUser);
    if (respuesta.errors) {
      respuesta.errors.details.map((error) => {
        erroresObj[error.context.key] = error.message;
        return false;
      });
      //relleno el objeto de errores con los errores que me devuelve la validacion de joi
    } else if (respuesta.errores) {
      if (
        respuesta.errores[0] === "Username already exists" &&
        respuesta.errores[1] === "Email has already been registered"
      ) {
        erroresObj.username = "Username already exists";
        erroresObj.email = "Email has already been registered";
      } else if (respuesta.errores[0] === "Username already exists") {
        erroresObj.username = "Username already exists";
      } else if (respuesta.errores[0] === "Email has already been registered") {
        erroresObj.email = "Email has already been registered";
      }
    }
    setErrors(erroresObj);
  };

  //pedido a api de paises para el select
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
    window.scrollTo(0, 0);
  }, []);

  // respuesta de registro con Google
  const responseGoogle = async (response) => {
    if (response.error) {
      Swal.fire({
        title: "Oops!",
        text:
          "It seems like something went wrong... Please try again in a minute!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const respuesta = await props.signUp({
        username: response.profileObj.givenName,
        password: response.profileObj.googleId,
        confirmation: response.profileObj.googleId,
        email: response.profileObj.email,
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        urlPic: response.profileObj.imageUrl,
        loggedWithGoogle: true,
      });

      if (respuesta.errors) {
        respuesta.errors.details.map((error) => {
          erroresObj[error.context.key] = error.message;
          return false;
        });
      }
    }
  };

  return (
    <div className="registryContainer">
      <div className="formTitle">
        <h2>Create a new account</h2>
      </div>
      <div className="formContainer">
        <Form>
          <div className="errorC" style={{ height: "1rem" }}>
            <span className="error" style={{ color: "white" }}>
              {errors.username ? errors.username : ""}
            </span>
          </div>
          <FormGroup>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.password ? errors.password : ""}
              </span>
            </div>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.confirmation ? "Passwords don't match" : ""}
              </span>
            </div>
            <Input
              type="password"
              placeholder="Confirm your password"
              name="confirmation"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.email ? errors.email : ""}
              </span>
            </div>
            <Input
              type="email"
              autoComplete="off"
              placeholder="Email"
              name="email"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.firstname
                  ? "First name must have at least two letters and a maximum of 20"
                  : ""}
              </span>
            </div>
            <Input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.lastname
                  ? "Last name must have at least two letters and a maximum of 20"
                  : ""}
              </span>
            </div>
            <Input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.urlPic
                  ? "You must enter a valid URL for you profile picture"
                  : ""}
              </span>
            </div>
            <Input
              type="text"
              placeholder="Profile picture URL"
              name="urlPic"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <div className="errorC" style={{ height: "1rem" }}>
              <span className="error" style={{ color: "white" }}>
                {errors.country ? "You must select a country" : ""}
              </span>
            </div>
            <Input
              type="select"
              name="country"
              id="country"
              onChange={leerInput}
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Select your country
              </option>
              {countries.map((country) => {
                return (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <div className="formHelp">
            <Link to="/login">
              <span>Have an account already?</span>
            </Link>
            <span onClick={upcoming} style={{ color: "white" }}>
              Forgot your password?
            </span>
          </div>
          <div className="createBtns">
            <div className="buttons">
              <button onClick={validate}>Create account</button>
              <GoogleLogin
                clientId="291388980311-dvqchmdp4eg6hd5vgm0r712qjvkpp6ud.apps.googleusercontent.com"
                buttonText="Signup with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </Form>
        <div className="erroresContainer">
          {/* {errors.map((error) => {
            return (
              <p key={error} style={{ color: "red" }}>
                {error}
              </p>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  signUp: authActions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

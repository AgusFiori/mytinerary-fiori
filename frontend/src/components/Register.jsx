import React, { useEffect, useState } from "react";
import "../styles/userforms.css";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import swal from "sweetalert";

import axios from "axios";

const Register = (props) => {
  const [newUser, setNewUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState([]);

  const leerInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

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
      setErrors(["Some fields are missing"]);
      return false;
    }
    const respuesta = await props.signUp(newUser);
    if (respuesta && !respuesta.success) {
      setErrors(respuesta.errores);
    } else {
      setErrors([]);
      swal({
        title: `Welcome aboard!`,
        text:
          "You may now browse and interact with the trendiest MyTineraries!",
        icon: "success",
        button: "Nice!",
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="registryContainer">
      <div className="formTitle">
        <h2>Create a new account</h2>
      </div>
      <div className="formContainer">
        <Form>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="password"
              placeholder="Confirm your password"
              name="confirmation"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="email"
              autoComplete="off"
              placeholder="Email"
              name="email"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
            <Input
              type="text"
              placeholder="Profile picture URL"
              name="urlPic"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <span
              className="error"
              style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.includes("Email has already been registered")
                ? "Email has already been registered"
                : ""}
            </span>
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
            <span style={{ color: "white" }}>Forgot your password?</span>
          </div>
          <div className="createBtn">
            <button onClick={validate}>Create account</button>
          </div>
        </Form>
        <div className="erroresContainer">
          {errors.map((error) => {
            return (
              <p key={error} style={{ color: "red" }}>
                {error}
              </p>
            );
          })}
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

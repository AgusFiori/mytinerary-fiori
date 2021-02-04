import React, { useEffect, useState } from "react";
import "../styles/userforms.css";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";

const Login = (props) => {
  const [userToLog, setUserToLog] = useState({});
  const [errors, setErrors] = useState([]);
  const { username, password } = userToLog;

  const leerInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserToLog({
      ...userToLog,
      [name]: value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Some fields are missing");
      return false;
    }
    const respuesta = await props.login(userToLog);
    if (respuesta && !respuesta.success) {
      console.log(respuesta);
      setErrors(respuesta.msg);
    } else {
      alert("Welcome !");
    }
  };

  return (
    <div className="registryContainer">
      <div className="formTitle">
        <h2>Login</h2>
      </div>
      <div className="formContainer">
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={leerInput}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={leerInput}
            />
          </FormGroup>
          <div className="formHelp">
            <Link to="/register">
              <span>Don't have an account yet?</span>
            </Link>
            <span style={{ color: "white" }}>Forgot your password?</span>
          </div>
          <div className="createBtn">
            <button onClick={login}>Login</button>
          </div>
        </Form>
        <div className="erroresContainer">
          <p style={{ color: "red" }}>{errors}</p>
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
  login: authActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

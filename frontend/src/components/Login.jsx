import React, { useEffect, useState } from "react";
import "../styles/userforms.css";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import GoogleLogin from "react-google-login";

const Login = (props) => {
  const [userToLog, setUserToLog] = useState({});
  const [errors, setErrors] = useState([]);
  const { username, password } = userToLog;

  // funcion  que lee input y lo guarda en un objeto
  const leerInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserToLog({
      ...userToLog,
      [name]: value,
    });
  };

  // tostadita de login exitoso
  const loginSuccessToast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // tostadita de que faltan llenar campos
  const missingFields = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // scrollea hasta arriba al montar componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // funcion que evalua errores y despacha accion
  const login = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      missingFields.fire({
        icon: "error",
        title: "There are some fields missing",
      });
      return false;
    }
    const respuesta = await props.login(userToLog);
    if (respuesta && !respuesta.success) {
      setErrors(respuesta.msg);
    } else {
      loginSuccessToast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    }
  };

  // funcion que captura datos del login con google, evalua errores y despacha accion
  const responseGoogle = async (response) => {
    const respuesta = await props.login({
      username: response.profileObj.email,
      password: response.profileObj.googleId,
    });
    if (respuesta && !respuesta.success) {
      Swal.fire({
        title: "Oops!",
        text: "Looks like there are no users linked to this Google account.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false;
    } else {
      loginSuccessToast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
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
          <div className="createBtns">
            <div className="buttons">
              <button onClick={login}>Login</button>
              <GoogleLogin
                clientId="291388980311-dvqchmdp4eg6hd5vgm0r712qjvkpp6ud.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
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

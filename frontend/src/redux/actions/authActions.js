import axios from "axios";
import Swal from "sweetalert2";

const authActions = {
  signUp: (newUser) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        "http://localhost:4000/register",
        newUser
      );
      if (respuesta && respuesta.data.success) {
        Swal.fire({
          title: `Welcome aboard, ${respuesta.data.respuesta.firstname}!`,
          text:
            "You may now browse and interact with the trendiest MyTineraries!",
          icon: "success",
          confirmButtonText: "Nice!",
        }).then(() => {
          dispatch({ type: "LOG_USER", payload: respuesta.data });
        });
        return false;
      }
      Swal.fire({
        title: `Oops!`,
        text: `Something went wrong! ${
          respuesta.data.errores
            ? "It seems there's already an account linked to your Google account"
            : "Please check for prompted errors."
        }`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return respuesta.data;
    };
  },
  logout: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "LOGOUT",
      });
    };
  },
  login: (user) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post("http://localhost:4000/login", user);
      if (!respuesta.data.success) {
        return respuesta.data;
      }
      dispatch({
        type: "LOG_USER",
        payload: respuesta.data,
      });
    };
  },
  logFromLS: (firstname, urlPic, token) => {
    return (dispatch, getState) => {
      dispatch({
        type: "LOG_USER",
        payload: {
          respuesta: { firstname: firstname, urlPic: urlPic, token: token },
        },
      });
    };
  },
};

export default authActions;

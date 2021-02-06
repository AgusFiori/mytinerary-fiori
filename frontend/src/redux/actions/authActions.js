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
  logFromLS: (token) => {
    return async (dispatch, getState) => {
      try {
        const respuesta = await axios.post(
          "http://localhost:4000/localstorage",
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({
          type: "LOG_USER",
          payload: {
            respuesta: { ...respuesta.data.respuesta },
          },
        });
      } catch (error) {
        if (error.respuesta.status === 401) {
          alert("Unauthorization error");
          localStorage.clear();
        }
      }
    };
  },
};

export default authActions;

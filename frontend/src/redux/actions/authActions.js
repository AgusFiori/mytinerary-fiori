import axios from "axios";

const authActions = {
  signUp: (newUser) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        "http://localhost:4000/register",
        newUser
      );
      if (!respuesta.data.success) {
        return respuesta.data;
      }

      dispatch({ type: "LOG_USER", payload: respuesta.data });
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
};

export default authActions;

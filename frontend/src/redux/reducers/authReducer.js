const initialState = {
  loggedUser: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_USER":
      localStorage.setItem("firstname", action.payload.respuesta.firstname);
      localStorage.setItem("urlPic", action.payload.respuesta.urlPic);
      localStorage.setItem("token", action.payload.respuesta.token);
      localStorage.setItem("id", action.payload.respuesta.id);

      return {
        ...state,
        loggedUser: action.payload.respuesta,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        loggedUser: null,
      };
    default:
      return state;
  }
};

module.exports = authReducer;

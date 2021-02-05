const initialState = {
  loggedUser: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_USER":
      console.log(action.payload);
      localStorage.setItem("firstname", action.payload.respuesta.firstname);
      localStorage.setItem("urlPic", action.payload.respuesta.urlPic);
      localStorage.setItem("token", action.payload.respuesta.token);
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

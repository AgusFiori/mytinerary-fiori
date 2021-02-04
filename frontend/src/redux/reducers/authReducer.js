const initialState = {
  loggedUser: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_USER":
      return {
        ...state,
        loggedUser: action.payload.respuesta,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedUser: null,
      };
    default:
      return state;
  }
};

module.exports = authReducer;

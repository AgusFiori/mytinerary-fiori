const initialState = {
  itineraries: [],
};

function itineraryReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ITINERARIES":
      return {
        ...state,
        itineraries: action.payload,
      };
    default:
      return state;
  }
}

export default itineraryReducer;

const initialState = {
  cities: [],
  filteredCities: [],
  city: [],
};

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
        filteredCities: action.payload,
      };
    case "FILTER_CITIES":
      return {
        ...state,
        filteredCities: state.cities.filter((city) => {
          return (
            city.cityName
              .toLowerCase()
              .indexOf(action.payload.trim().toLowerCase()) === 0
          );
        }),
      };
    case "GET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
}

export default cityReducer;

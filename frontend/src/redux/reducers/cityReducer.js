const initialState = {
  cities: [],
  filteredCities: [],
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
              .indexOf(action.payload.toLowerCase()) === 0
          );
        }),
      };
    default:
      return state;
  }
}

export default cityReducer;

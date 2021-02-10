import axios from "axios";

const citiesActions = {
  //accion par obtener todas las ciudades
  getCities: () => {
    return async (dispatch, getState) => {
      const respuesta = await axios.get("http://127.0.0.1:4000/cities");
      const cities = respuesta.data.respuesta;

      dispatch({
        // esto es la action
        type: "GET_CITIES",
        payload: cities,
      });
    };
  },

  getCity: (id) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.get(`http://127.0.0.1:4000/city/${id}`);
      const city = respuesta.data.respuesta;

      dispatch({
        type: "GET_CITY",
        payload: city,
      });
    };
  },

  filterCities: (filter) => {
    return async (dispatch, getState) => {
      dispatch({
        type: "FILTER_CITIES",
        payload: filter,
      });
    };
  },
};

export default citiesActions;

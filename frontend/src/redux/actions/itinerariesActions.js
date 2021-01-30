import axios from "axios";

const itinerariesActions = {
  //accion par obtener todas las ciudades
  getItineraries: (id) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.get(
        `http://127.0.0.1:4000/itineraries/${id}`
      );
      const itineraries = respuesta.data.respuesta;

      dispatch({
        type: "GET_ITINERARIES",
        payload: itineraries,
      });
    };
  },
};

export default itinerariesActions;

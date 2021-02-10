import axios from "axios";

const usersActions = {
  postComment: (token, comment, id, firstname, urlPic, cityId) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        `http://127.0.0.1:4000/itinerary/${id}`,
        { comment, firstname, urlPic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (respuesta.data.success === true) {
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${cityId._id}`
        );
        dispatch({
          type: "GET_ITINERARIES",
          payload: respuesta.data.respuesta,
        });
      }
    };
  },
};

export default usersActions;

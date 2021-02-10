import axios from "axios";

const usersActions = {
  postComment: (comment) => {
    const { id, name, urlPic, token, cityId } = comment;
    const actualComment = comment.comment;
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        `http://127.0.0.1:4000/itinerary/${id}`,
        { actualComment, name, urlPic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (respuesta.data.success === true) {
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${cityId}`
        );
        dispatch({
          type: "GET_ITINERARIES",
          payload: respuesta.data.respuesta,
        });
      }
    };
  },
  deleteComment: (commentId, itineraryId, token, cityId) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.delete(
        `http://127.0.0.1:4000/itinerary/${itineraryId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (respuesta.data.success === true) {
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${cityId}`
        );
        dispatch({
          type: "GET_ITINERARIES",
          payload: respuesta.data.respuesta,
        });
      }
    };
  },
  likeItinerary: (itineraryId, token, cityId) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        `http://127.0.0.1:4000/itinerary/like/${itineraryId}`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (respuesta.data.success === true) {
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${cityId}`
        );
        dispatch({
          type: "GET_ITINERARIES",
          payload: respuesta.data.respuesta,
        });
      }
    };
  },
  dislikeItinerary: (itineraryId, token, cityId) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        `http://127.0.0.1:4000/itinerary/dislike/${itineraryId}`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (respuesta.data.success === true) {
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${cityId}`
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

// token, comment, id, firstname, urlPic, cityId

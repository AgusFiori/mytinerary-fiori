import axios from "axios";
import Swal from "sweetalert2";

const commentDeletedToast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const commentAddedToast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const commentModifiedToast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

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
        commentAddedToast.fire({
          icon: "success",
          title: "Comment posted successfully",
        });
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
        commentDeletedToast.fire({
          icon: "success",
          title: "Comment deleted successfully",
        });
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
  editComment: (commentToEdit) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.put(
        `http://127.0.0.1:4000/itinerary/${commentToEdit.id}`,
        { commentToEdit },
        {
          headers: {
            Authorization: `Bearer ${commentToEdit.token}`,
          },
        }
      );
      if (respuesta.data.success === true) {
        commentModifiedToast.fire({
          icon: "success",
          title: "Comment modified successfully",
        });
        const respuesta = await axios.get(
          `http://127.0.0.1:4000/itineraries/${commentToEdit.cityId}`
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

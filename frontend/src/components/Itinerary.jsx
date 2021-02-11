import React, { useState, useEffect } from "react";
import "../styles/itinerary.css";
import Comment from "./Comment.jsx";
import { Activity } from "./Activity.jsx";
import { RiWheelchairFill, RiWheelchairLine } from "react-icons/ri";
import { HiCash, HiOutlineCash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiOutlineSend, AiFillHeart } from "react-icons/ai";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import Swal from "sweetalert2";
import itinerariesActions from "../redux/actions/itinerariesActions";

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState({});

  const leerInput = (e) => {
    const comment = e.target.value;
    setComment({
      comment: comment,
      token: props.loggedUser.token,
      id: props.itinerary._id,
      name: props.loggedUser.firstname,
      urlPic: props.loggedUser.urlPic,
      cityId: props.itinerary.cityId._id,
    });
  };

  const postComment = async () => {
    if (props.loggedUser) {
      if (comment.comment) {
        await props.postComment(comment);
      } else {
        Swal.fire({
          title: `Oops!`,
          text: "Comment must not be empty!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: `Oops!`,
        text: "You must be logged in to comment",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const like = async () => {
    await props.likeItinerary(
      props.itinerary._id,
      props.loggedUser.token,
      props.itinerary.cityId._id
    );
  };

  const dislike = async () => {
    await props.dislikeItinerary(
      props.itinerary._id,
      props.loggedUser.token,
      props.itinerary.cityId._id
    );
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="container">
      <div className="itinerary" key={props.itinerary._id}>
        <div className="itineraryTitle">
          <h3>{props.itinerary.title}</h3>
        </div>
        <div className="content">
          <div className="author">
            <div
              style={{
                backgroundImage: "url(" + props.itinerary.authorPic + ")",
                height: "150px",
                width: "150px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "50%",
              }}
            ></div>
            {/* <img src="../images/user-icon-male.jpg" alt="avatar" /> */}
            <span>{props.itinerary.authorName}</span>
          </div>
          <div className="info">
            <div className="ratings">
              {props.loggedUser ? (
                props.itinerary.likes.find(
                  (like) => like === props.loggedUser.id
                ) ? (
                  <span onClick={dislike}>
                    <AiFillHeart color="darkred" />
                    {" " + props.itinerary.likes.length}
                  </span>
                ) : (
                  <span onClick={like}>
                    <AiOutlineHeart />
                    {" " + props.itinerary.likes.length}
                  </span>
                )
              ) : (
                <span
                  onClick={() =>
                    Swal.fire({
                      title: `Oops!`,
                      text: "You must be logged in to like itineraries",
                      icon: "error",
                      confirmButtonText: "Ok",
                    })
                  }
                >
                  <AiOutlineHeart />

                  {" " + props.itinerary.likes.length}
                </span>
              )}
              <span>Duration: {props.itinerary.duration}h</span>
              <span style={{ color: "darkgreen" }}>
                {Array(props.itinerary.budget).fill(<HiCash />)}
                {(() => {
                  switch (props.itinerary.budget) {
                    case 5:
                      break;
                    case 4:
                      return <span>{Array(1).fill(<HiOutlineCash />)}</span>;
                    case 3:
                      return <span>{Array(2).fill(<HiOutlineCash />)}</span>;
                    case 2:
                      return <span>{Array(3).fill(<HiOutlineCash />)}</span>;
                    case 1:
                      return <span>{Array(4).fill(<HiOutlineCash />)}</span>;
                    default:
                      return <span>{Array(5).fill(<HiOutlineCash />)}</span>;
                  }
                })()}
              </span>
              <span>
                {props.itinerary.accesibility ? (
                  <RiWheelchairFill />
                ) : (
                  <RiWheelchairLine />
                )}
              </span>
            </div>
            <div className="hashtags">
              {props.itinerary.hashtags.map((hashtag) => {
                return (
                  <span style={{ fontSize: "18px" }} key={uuidv4()}>
                    #{hashtag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="commentsContainer">
          {visible && (
            <>
              <div className="activities">
                {props.itinerary.activities.map((activity) => {
                  return <Activity key={uuidv4()} activity={activity} />;
                })}
              </div>
              <div className="comments">
                {props.itinerary.comments.map((comment) => {
                  return (
                    <Comment
                      key={uuidv4()}
                      comment={comment}
                      id={props.itinerary._id}
                      cityId={props.itinerary.cityId}
                    />
                  );
                })}
              </div>
              <div className="commentInput">
                <input
                  id="commentInput"
                  type="text"
                  placeholder="Write down a comment..."
                  onChange={leerInput}
                />
                <button className="ingresarComentario" onClick={postComment}>
                  <AiOutlineSend />
                </button>
              </div>
            </>
          )}
          <div className="buttonContainer">
            <button onClick={() => setVisible(!visible)}>
              View {visible ? "Less" : "More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  postComment: userActions.postComment,
  getItineraries: itinerariesActions.getItineraries,
  getComments: userActions.getComments,
  likeItinerary: userActions.likeItinerary,
  dislikeItinerary: userActions.dislikeItinerary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

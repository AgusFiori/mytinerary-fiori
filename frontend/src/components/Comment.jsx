import React, { useState } from "react";
import "../styles/comment.css";
import { AiOutlineCloseCircle, AiFillEdit } from "react-icons/ai";
import { connect } from "react-redux";
import usersActions from "../redux/actions/userActions";
import { AiOutlineSend } from "react-icons/ai";

// import itinerariesActions from "../redux/actions/itinerariesActions";

const Comment = (props) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState({});

  const leerInput = (e) => {
    const comment = e.target.value;
    setComment({
      comment: comment,
      token: props.loggedUser.token,
      id: props.id,
      cityId: props.cityId._id,
      commentId: props.comment._id,
    });
  };

  const getComment = (e) => {
    props.deleteComment(
      props.comment._id,
      props.id,
      props.loggedUser.token,
      props.cityId._id
    );
  };

  const modifyComment = (e) => {
    setVisible(!visible);
    props.editComment(comment);
  };

  return (
    <div className="commentContainer">
      <div className="infoComments">
        <div
          className="avatar"
          style={{
            backgroundImage: "url(" + props.comment.avatar + ")",
            height: "100px",
            width: "100px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="username">{props.comment.username}:</div>
        <div className="comment">
          {!visible ? (
            props.comment.comment
          ) : (
            <>
              <input
                className="edit"
                onChange={leerInput}
                placeholder={props.comment.comment}
                style={{ padding: "0.3rem" }}
              ></input>
              <AiOutlineSend
                onClick={modifyComment}
                style={{
                  fontSize: "32px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
              />
            </>
          )}
        </div>
      </div>
      {props.loggedUser &&
        props.loggedUser.firstname === props.comment.username &&
        props.loggedUser.urlPic === props.comment.avatar && (
          <div className="actions">
            <AiFillEdit
              color="darkorange"
              style={{ cursor: "pointer" }}
              onClick={() => setVisible(!visible)}
            />
            <AiOutlineCloseCircle
              color="darkred"
              style={{ cursor: "pointer" }}
              onClick={getComment}
            />
          </div>
        )}
    </div>
  );
};

const mapDispatchToProps = {
  deleteComment: usersActions.deleteComment,
  editComment: usersActions.editComment,
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

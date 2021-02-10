import React, { useState } from "react";
import "../styles/comment.css";
import { AiOutlineCloseCircle, AiFillEdit } from "react-icons/ai";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";

const Comment = (props) => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState("");

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
        <div className="comment">{props.comment.comment}</div>
      </div>
      {props.loggedUser.firstname === props.comment.username &&
        props.loggedUser.urlPic === props.comment.avatar && (
          <div className="actions">
            <AiFillEdit color="darkorange" style={{ cursor: "pointer" }} />
            <AiOutlineCloseCircle
              color="darkred"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

export default connect(mapStateToProps)(Comment);

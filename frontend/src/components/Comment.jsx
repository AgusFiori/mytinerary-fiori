import React from "react";
import "../styles/comment.css";

export const Comment = ({ comment }) => {
  return (
    <div className="commentContainer">
      <div className="avatar">
        <img src={comment.avatar} alt="avatar" />
      </div>
      <div className="comment">{comment.comment}</div>
    </div>
  );
};

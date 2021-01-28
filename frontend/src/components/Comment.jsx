import React from "react";

export const Comment = ({ comment }) => {
  console.log(comment.comment);
  return <div>{comment.comment}</div>;
};

import React, { useState } from "react";
import "../styles/itinerary.css";
import { Comment } from "./Comment.jsx";
import { RiWheelchairFill, RiWheelchairLine } from "react-icons/ri";
import { HiCash } from "react-icons/hi";

export const Itinerary = ({ itinerary }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="container">
      <div className="itinerary" key={itinerary._id}>
        <div className="center">
          <h3>{itinerary.title}</h3>
        </div>
        <div className="content">
          <div className="author">
            <img src="../images/user-icon-male.jpg" alt="avatar" />
            <span>{itinerary.authorName}</span>
          </div>
          <div className="info">
            <div className="ratings">
              <span>{itinerary.likes} Likes</span>
              <span>{itinerary.duration}h</span>
              <span>{Array(itinerary.budget).fill(<HiCash />)}</span>
              <span>
                {itinerary.accesibility ? (
                  <RiWheelchairFill />
                ) : (
                  <RiWheelchairLine />
                )}
              </span>
            </div>
            <div className="hashtags">
              {itinerary.hashtags.map((hashtag) => {
                return <span>#{hashtag}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="commentsContainer">
          {visible && (
            <>
              <div className="activities"></div>
              <div className="comments">
                {itinerary.comments.map((comment) => {
                  return <Comment comment={comment} />;
                })}
              </div>
            </>
          )}
          <div className="center">
            <button onClick={() => setVisible(!visible)}>
              View {visible ? "Less" : "More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
